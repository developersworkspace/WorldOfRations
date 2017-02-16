import { Component, OnInit } from '@angular/core';

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

  feedstuffList: any[] = [];

  feedstufffs: any[] = [];

  selectedFormulaName: string;
  selectedFormula: any = null;

  errorMessage: string = null;

  formulatorResult: any = null;

  isFormulating: boolean = false;

  constructor(private feedstuffService: FeedstuffService, private formulaService: FormulaService, private formulatorService: FormulatorService) { }

  ngOnInit() {
    this.feedstuffService.listFeedstuffs().subscribe((result: any[]) => {
      this.feedstuffList = result;
    }, (error: Error) => {
      this.errorMessage = 'An error has occurred while loading feedstuff';
    });

    this.formulaService.listFormulas().subscribe((result: any[]) => {
      this.formulaList = result;
    }, (error: Error) => {
      this.errorMessage = 'An error has occurred while loading formulas';
    });

    this.onClick_ResetToDefaults();
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
      this.errorMessage = 'Please select a formula'
    } else {
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
        feedstuffs: feedstuffs
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
}
