import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

// Services
import { FormulatorService } from '../services/formulator.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  formulations: any[];

  constructor(private formulatorService: FormulatorService) { }

  ngOnInit() {
    this.formulatorService.getFormulations().subscribe((result: any[]) => {
      this.formulations = result;
    }, (error: Error) => {
      
    });
  }

}
