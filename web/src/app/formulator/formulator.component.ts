import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

// Services
import { FeedstuffService } from '../services/feedstuff.service';
import { FormulaService } from '../services/formula.service';
import { FormulatorService } from '../services/formulator.service';

@Component({
  selector: 'app-formulator',
  templateUrl: './formulator.component.html',
  styleUrls: ['./formulator.component.css']
})
export class FormulatorComponent implements OnInit {

  formulaList: any[] = [];
  formulaListDataSource: Observable<any> = null;
  selectedFormulaName: string;
  selectedFormula: any = null;

  feedstuffList: any[] = [];

  currencyList: string[] = [];
  selectedCurrencyNames: string[];

  errorMessage: string = null;
  isFormulating: boolean = false;

  feedstufffs: any[] = [];
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
      this.feedstuffService.getSuggestedValues(this.selectedFormula.id, instance.selectedFeedstuff.id).subscribe((result: any) => {
        if (result != null) {
          instance.minimum = result.minimum;
          instance.maximum = result.maximum;
        }
        instance.isLoading = false;
      });
    }
  }

  onSelect_Formula(item: any) {
    this.selectedFormula = item.item;
    for (let i = 0; i < this.feedstufffs.length; i++) {
      this.onUpdate_SuggestedValues({
        item: this.feedstufffs[i].selectedFeedstuff
      }, this.feedstufffs[i]);
    }
  }

  onClick_AddFeedstuff() {
    this.feedstufffs.push({
      selectedFeedstuffName: null,
      selectedFeedstuff: null,
      minimum: 0,
      maximum: 1000,
      cost: null,
      isLoading: false
    });
  }

  onClick_RemoveFeedstuff(item: any) {
    this.feedstufffs.splice(this.feedstufffs.indexOf(item), 1);
  }

  onClick_ResetToDefaults() {
    this.feedstuffService.listExampleFeedstuffs().subscribe((result: any[]) => {
      this.feedstufffs = result;
    }, (error: Error) => {
      this.errorMessage = 'An error has occurred while loading example feedstuff';
    });
  }

  onClick_Formulate() {
    this.formulatorResult = null;
    if (this.selectedFormula == null) {
      this.errorMessage = 'Please select a formula';
    } else {


      for (let i = 0; i < this.feedstufffs.length; i ++) {
        if (this.feedstufffs[i].selectedFeedstuff == null) {
          continue;
        }
        
        if (this.feedstufffs.filter(x => x.selectedFeedstuff.id == this.feedstufffs[i].selectedFeedstuff.id).length > 1) {
          this.errorMessage = 'Cannot have duplicate feedstuffs';
          return;
        }
      }

      this.isFormulating = true;
      this.errorMessage = null;
      let feedstuffs: any[] = [];
      for (let i = 0; i < this.feedstufffs.length; i++) {
        if (this.feedstufffs[i].selectedFeedstuff != null) {
          feedstuffs.push({
            id: this.feedstufffs[i].selectedFeedstuff.id,
            cost: this.feedstufffs[i].cost,
            minimum: this.feedstufffs[i].minimum,
            maximum: this.feedstufffs[i].maximum
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
    this.feedstuffService.listFeedstuffs().subscribe((result: any[]) => {
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
