import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

// imports services
import { FeedstuffService } from '../services/feedstuff.service';
import { FormulaService } from '../services/formula.service';
import { FormulatorService } from '../services/formulator.service';

// Imports models
import { Feedstuff } from './../models/feedstuff';
import { Formula } from './../models/formula';

@Component({
  selector: 'app-formulator',
  templateUrl: './formulator.component.html',
  styleUrls: ['./formulator.component.css']
})
export class FormulatorComponent implements OnInit {

  formulaList: Formula[] = [];
  formulaListDataSource: Observable<any> = null;
  selectedFormulaName: string;
  selectedFormula: Formula = null;

  feedstuffList: Feedstuff[] = [];

  currencyList: string[] = [];
  selectedCurrencyNames: string[];

  errorMessage: string = null;
  isFormulating: boolean = false;

  feedstuffs: any[] = [];
  formulatorResult: any = null;

  constructor(private feedstuffService: FeedstuffService, private formulaService: FormulaService, private formulatorService: FormulatorService) { }

  ngOnInit() {


    this.initializeCurrencyControl();
    this.loadFeedstuffList();
    this.loadFormulaList();
    this.onClick_ResetToDefaults();
  }


  getFormulaListAsDataSource(token: string): Observable<any> {


    return Observable.of(
      this.formulaList.filter((item: any) => {
        let isValid = false;

        let splittedName = item.name.split(' ');
        let splittedToken = token.split(' ');

        for (let i = 0; i < splittedToken.length; i++) {
          if (splittedToken[i] == null || splittedToken[i] == '') {
            return false;
          }
          let query = new RegExp(splittedToken[i], 'ig');
          if (query.test(item.name)) {
            return true;
          }
        }

        return false;
      })
    );
  }

  onSelect_Currency(selectedCurrency) {
    this.selectedCurrencyNames = [selectedCurrency.id];
  }

  onUpdate_SuggestedValues(item: any, instance: any) {
    if (item.item != null) {
      instance.selectedFeedstuff = item.item;
      instance.selectedFeedstuffName = item.item.name;
    }

    if (item.item != null && this.selectedFormula != null) {
      instance.isLoading = true;
      this.feedstuffService.findSuggestedValues(this.selectedFormula.id, instance.selectedFeedstuff.id).subscribe((result: any) => {
        if (result != null) {
          instance.minimum = result.minimum;
          instance.maximum = result.maximum;
        }
        instance.isLoading = false;

        this.updateFeedstuffErrorMessages();
      });
    }
  }

  onSelect_Formula(item: any) {
    this.selectedFormula = item.item;
    for (let i = 0; i < this.feedstuffs.length; i++) {
      this.onUpdate_SuggestedValues({
        item: this.feedstuffs[i].selectedFeedstuff
      }, this.feedstuffs[i]);
    }
  }

  onClick_AddFeedstuff() {
    this.feedstuffs.push({
      selectedFeedstuffName: null,
      selectedFeedstuff: null,
      minimum: 0,
      maximum: 1000,
      cost: null,
      isLoading: false
    });
  }

  onClick_RemoveFeedstuff(item: any) {
    this.feedstuffs.splice(this.feedstuffs.indexOf(item), 1);
  }

  onClick_ResetToDefaults() {
    this.feedstuffService.listExampleFeedstuffs().subscribe((result: any[]) => {
      this.feedstuffs = result;
    }, (error: Error) => {
      this.errorMessage = 'An error has occurred while loading example feedstuff';
    });
  }

  onClick_Formulate() {
    this.formulatorResult = null;
    if (this.selectedFormula == null) {
      this.errorMessage = 'Please select a formula';
    } else {

      let isValid = true;

      this.updateFeedstuffErrorMessages();

      for (let i = 0; i < this.feedstuffs.length; i++) {

        if (this.feedstuffs[i].errorMessage != null) {
          isValid = false;
        }

        if (this.feedstuffs[i].selectedFeedstuff != null && this.feedstuffs.filter(x => x.selectedFeedstuff != null && x.selectedFeedstuff.id == this.feedstuffs[i].selectedFeedstuff.id).length > 1) {
          this.errorMessage = 'Cannot have duplicate feedstuffs';
          isValid = false;
        }
      }


      if (!isValid) {
        return;
      }

      this.isFormulating = true;
      this.errorMessage = null;
      let feedstuffs: any[] = [];
      for (let i = 0; i < this.feedstuffs.length; i++) {
        if (this.feedstuffs[i].selectedFeedstuff != null) {
          feedstuffs.push({
            id: this.feedstuffs[i].selectedFeedstuff.id,
            cost: this.feedstuffs[i].cost,
            minimum: this.feedstuffs[i].minimum,
            maximum: this.feedstuffs[i].maximum
          });
        }
      }
      let obj = {
        formulaId: this.selectedFormula.id,
        feedstuffs: feedstuffs,
        currencyCode: this.selectedCurrencyNames[0]
      };

      this.formulatorService.formulate(obj).subscribe((result: any) => {
        this.formulatorResult = result;
        this.isFormulating = false;
      }, (error: Error) => {
        this.errorMessage = 'An error has occurred while formulating';
        this.isFormulating = false;
      });
    }
  }

  private updateFeedstuffErrorMessages() {
    for (let i = 0; i < this.feedstuffs.length; i++) {
      this.feedstuffs[i].errorMessage = this.validateFeedstuff(this.feedstuffs[i]);
      if (this.feedstuffs[i].selectedFeedstuff != null && this.feedstuffs.filter(x => x.selectedFeedstuff != null && x.selectedFeedstuff.id == this.feedstuffs[i].selectedFeedstuff.id).length > 1) {
        this.errorMessage = 'Cannot have duplicate feedstuffs';
      }
    }
  }

  private validateFeedstuff(item: any) {
    
    if (!item.selectedFeedstuff) {
      return 'Please select a feedstuff';
    }

    if (this.isEmpty(item.minimum)) {
      return 'Please enter a minimum value';
    }

    if (this.isEmpty(item.maximum)) {
      return 'Please enter a maximum value';
    }

    if (this.isEmpty(item.cost)) {
      return 'Please enter a cost';
    }

    return null;
  }

  private isEmpty(value) {
    return typeof value == 'string' && !value.trim() || typeof value == 'undefined' || value === null;
  }

  private loadFormulaList() {
    this.formulaService.listFormulas().subscribe((result: any[]) => {
      this.formulaList = result;
    }, (error: Error) => {
      this.errorMessage = 'An error has occurred while loading formulas';
    });

    this.formulaListDataSource = Observable
      .create((observer: any) => {
        // Runs on every search
        observer.next(this.selectedFormulaName);
      })
      .mergeMap((token: string) => this.getFormulaListAsDataSource(token));
  }

  private loadFeedstuffList() {
    this.feedstuffService.listFeedstuffs().subscribe((result: Feedstuff[]) => {
      this.feedstuffList = result;
    }, (error: Error) => {
      this.errorMessage = 'An error has occurred while loading feedstuff';
    });
  }

  private initializeCurrencyControl() {
    this.currencyList = [
      'USD',
      'ZAR'
    ];

    this.selectedCurrencyNames = ['USD'];
  }

}
