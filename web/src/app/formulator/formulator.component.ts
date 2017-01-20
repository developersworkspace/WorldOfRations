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

  selectedFormula: any = null;

  errorMessage: string = null;

  formulatorResult: any = null;

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
    if (item != null && this.selectedFormula != null) {
      instance.isLoading = true;
      this.feedstuffService.getSuggestedValues(this.selectedFormula.id, item.id).subscribe((result: any[]) => {
        if (result.length > 0) {
          instance.minimum = result[0].minimum;
          instance.maximum = result[0].maximum;
        }
        instance.isLoading = false;
      });
    }
  }

  onSelect_Formula(item: any) {
    this.selectedFormula = item;
    for (let i = 0; i < this.feedstufffs.length; i++) {
      this.onUpdate_SuggestedValues(this.feedstufffs[i], this.feedstufffs[i]);
    }
  }

  onClick_AddFeedstuff() {
    this.feedstufffs.push({
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
    console.log('a');
    if (this.selectedFormula == null) {
      this.errorMessage = 'Please select a formula'
    } else {
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
      }, (error: Error) => {
        this.errorMessage = 'An error has occurred while formulating';
      });
    }
  }
}
