import { Component, OnInit } from '@angular/core';
import 'rxjs/add/observable/of';
import { Observable } from 'rxjs/Observable';

// Imports services
import { FormulatorService } from './../services/formulator.service';

// Imports models
import { Formulation } from './../models/formulation';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent implements OnInit {

  public formulations: Formulation[];

  constructor(private formulatorService: FormulatorService) { }

  public ngOnInit() {
    this.formulatorService.listFormulations().subscribe((result: Formulation[]) => {
      this.formulations = result;
    }, (error: Error) => {
      console.log(error);
    });
  }

}
