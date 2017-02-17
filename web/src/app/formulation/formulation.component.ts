import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

// Services
import { FormulatorService } from '../services/formulator.service';

@Component({
  selector: 'app-formulation',
  templateUrl: './formulation.component.html',
  styleUrls: ['./formulation.component.css']
})
export class FormulationComponent implements OnInit {

  formulation: any;

  totalWeightOfFeedstuffInFormulation: number;
  totalCostOfFeedstuffInFormulation: number;
  totalWeightOfSupplementFeedstuffInFormulation: number;

  constructor(private activatedRoute: ActivatedRoute, private formulatorService: FormulatorService) { }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      let formulationId = params['formulationId'];
      this.formulatorService.getFormulation(formulationId).subscribe((formulation: any) => {
        formulation.feedstuffs.sort(function (a, b) {
          return (b.weight < a.weight) ? -1 : 1;
        });
        formulation.composition.sort(function (a, b) {
          return (a.sortOrder < b.sortOrder) ? -1 : 1;
        });
        this.formulation = formulation;
        this.updateTotals();
      });
    });
  }

  onSelect_SupplementFeedstuff(supplementElement, selectedSupplementFeedstuff) {
    if (supplementElement == null || selectedSupplementFeedstuff == null || supplementElement.supplementFeedstuffs == null) {
      return;
    }

    for (let i = 0; i < supplementElement.supplementFeedstuffs.length; i++) {
      if (supplementElement.supplementFeedstuffs[i].id == selectedSupplementFeedstuff.id) {
        supplementElement.selectedSupplementFeedstuff = [supplementElement.supplementFeedstuffs[i]];
      }
    }

    this.updateTotals();
  }

  private updateTotals() {
    this.totalWeightOfFeedstuffInFormulation = this.getTotalWeightOfFeedstuffInFormulation();
    this.totalCostOfFeedstuffInFormulation = this.getTotalCostOfFeedstuffInFormulation();
    this.totalWeightOfSupplementFeedstuffInFormulation = this.getTotalWeightOfSupplementFeedstuffInFormulation();
  }

  private getTotalWeightOfFeedstuffInFormulation() {
    return this.formulation.feedstuffs.map(x => x.weight).reduce((a, b) => a + b, 0).toFixed(2);
  }

  private getTotalCostOfFeedstuffInFormulation() {
    return this.formulation.feedstuffs.map(x => x.weight * (x.cost / 1000)).reduce((a, b) => a + b, 0).toFixed(2);
  }

  private getTotalWeightOfSupplementFeedstuffInFormulation() {
    return this.formulation.supplementComposition.map(x => x.selectedSupplementFeedstuff[0] == undefined? 0 : x.selectedSupplementFeedstuff[0].weight).reduce((a, b) => a + b, 0);
  }
}
