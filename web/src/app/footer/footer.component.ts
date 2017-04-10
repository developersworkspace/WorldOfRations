import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

// Imports services
import { FormulatorService } from './../services/formulator.service';

// Imports models
import { Formulation } from './../models/formulation';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  formulations: Formulation[];

  constructor(private formulatorService: FormulatorService) { }

  ngOnInit() {
    this.formulatorService.listFormulations().subscribe((result: Formulation[]) => {
      this.formulations = result;
    }, (error: Error) => {
      
    });
  }

}
