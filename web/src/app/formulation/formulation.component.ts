import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

// Imports services
import { FormulatorService } from '../services/formulator.service';

// Imports models
import { Formulation } from './../models/formulation';

@Component({
  selector: 'app-formulation',
  templateUrl: './formulation.component.html',
  styleUrls: ['./formulation.component.css'],
})
export class FormulationComponent implements OnInit {

  public formulation: Formulation;

  public totalWeightOfFeedstuffInFormulation: string;
  public totalCostOfFeedstuffInFormulation: string;
  public  totalWeightOfSupplementFeedstuffInFormulation: number;

  constructor(private activatedRoute: ActivatedRoute, private formulatorService: FormulatorService) { }

  public ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      const formulationId = params['formulationId'];
      this.formulatorService.findFormulation(formulationId).subscribe((formulation: Formulation) => {
        formulation.feedstuffs.sort((a, b) => {
          return (b.weight < a.weight) ? -1 : 1;
        });
        formulation.composition.sort((a, b) => {
          return (a.sortOrder < b.sortOrder) ? -1 : 1;
        });
        this.formulation = formulation;
        this.updateTotals();
      });
    });
  }

  public  onSelect_SupplementFeedstuff(supplementElement, selectedSupplementFeedstuff): void {
    if (supplementElement == null || selectedSupplementFeedstuff == null || supplementElement.supplementFeedstuffs == null) {
      return;
    }

    for (let i = 0; i < supplementElement.supplementFeedstuffs.length; i++) {
      if (supplementElement.supplementFeedstuffs[i].id == selectedSupplementFeedstuff.id) {
        supplementElement.selectedSupplementFeedstuffs = [supplementElement.supplementFeedstuffs[i]];
      }
    }

    this.updateTotals();
  }

  private updateTotals(): void {
    this.totalWeightOfFeedstuffInFormulation = this.getTotalWeightOfFeedstuffInFormulation();
    this.totalCostOfFeedstuffInFormulation = this.getTotalCostOfFeedstuffInFormulation();
    this.totalWeightOfSupplementFeedstuffInFormulation = this.getTotalWeightOfSupplementFeedstuffInFormulation();
  }

  private getTotalWeightOfFeedstuffInFormulation() {
    return this.formulation.feedstuffs.map((x) => x.weight).reduce((a, b) => a + b, 0).toFixed(2);
  }

  private getTotalCostOfFeedstuffInFormulation(): string {
    return this.formulation.feedstuffs.map((x) => x.weight * (x.cost / 1000)).reduce((a, b) => a + b, 0).toFixed(2);
  }

  private getTotalWeightOfSupplementFeedstuffInFormulation(): number {
    return this.formulation.supplementComposition.map((x) => x.selectedSupplementFeedstuffs[0] == undefined ? 0 : x.selectedSupplementFeedstuffs[0].weight).reduce((a, b) => a + b, 0);
  }
}
