import { Component, OnInit } from '@angular/core';

// Services
import { FeedstuffService } from '../services/feedstuff.service';
import { FormulaService } from '../services/formula.service';

@Component({
  selector: 'app-formulator',
  templateUrl: './formulator.component.html',
  styleUrls: ['./formulator.component.css']
})
export class FormulatorComponent implements OnInit {

  formulaList: any[] = [];

  feedstufffsList: any[] = [];

  feedstufffs: any[] = [];

  selectedFormula: any = null;

  constructor(private feedstuffService: FeedstuffService, private formulaService: FormulaService) { }

  ngOnInit() {
    this.feedstuffService.listFeedstuff().subscribe((x: any[]) => {
      this.feedstufffsList = x;
    }, (error: any) => {

    });

    this.formulaService.listFormula().subscribe((x: any[]) => {
      this.formulaList = x;
    }, (error: any) => {

    });

    this.feedstuffService.listExampleFeedstuff().subscribe((x: any[]) => {
      this.feedstufffs = x;
    }, (error: any) => {

    });
  }

  update_SuggestedValues(item, instance) {
    console.log(this.selectedFormula);
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
      this.update_SuggestedValues(this.feedstufffs[i], this.feedstufffs[i]);
    }
  }

  onClick_AddFeedstuff() {
    this.feedstufffs.push({
      selectedFeedstuff: null,
      mininum: 0,
      maximum: 1000,
      cost: 4000,
      isLoading: false
    });
  }

  onClick_RemoveFeedstuff(item) {
    this.feedstufffs.splice(this.feedstufffs.indexOf(item), 1);
  }

  onClick_Formulate() {
    console.log(this.feedstufffs);
  }

}
