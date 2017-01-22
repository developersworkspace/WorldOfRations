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
      });
    });
  }

}
