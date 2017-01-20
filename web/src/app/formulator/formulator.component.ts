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
    this.feedstuffService.listFeedstuffs().subscribe((x: any[]) => {
      this.feedstuffList = x;
    }, (error: any) => {
      this.errorMessage = 'An error has occurred while loading feedstuff';
    });

    this.formulaService.listFormulas().subscribe((x: any[]) => {
      this.formulaList = x;
    }, (error: any) => {
      this.errorMessage = 'An error has occurred while loading formulas';
    });

    this.onClick_ResetToDefaults();
  }

  onUpdate_SuggestedValues(item, instance) {
    if (item != null && this.selectedFormula != null) {
      instance.isLoading = true;
      this.feedstuffService.getSuggestedValues(this.selectedFormula.id, item.id).subscribe((x: any[]) => {
        if (x.length > 0) {
          instance.minimum = x[0].minimum;
          instance.maximum = x[0].maximum;
        }
        instance.isLoading = false;
      });
    }
  }

  onSelect_Formula(item) {
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
      cost: 4000,
      isLoading: false
    });
  }

  onClick_RemoveFeedstuff(item) {
    this.feedstufffs.splice(this.feedstufffs.indexOf(item), 1);
  }

  onClick_ResetToDefaults() {
    this.feedstuffService.listExampleFeedstuffs().subscribe((x: any[]) => {
      this.feedstufffs = x;
    }, (error: any) => {
      this.errorMessage = 'An error has occurred while loading example feedstuff';
    });
  }

  onClick_Formulate() {
    this.formulatorResult = null;
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
      }
      this.formulatorService.formulate(obj).subscribe((result: any) => {
        this.formulatorResult = result;
      }, (error: any) => {
        this.errorMessage = 'An error has occurred while formulating';
      });
    }
  }
}
