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

  feedstufffs: any[] = [
    {
      selectedFeedstuff: null,
      mininum: 0,
      maximum: 1000,
      cost: 4000,
      onSelect_Feedstuff: (item, instance) => {
        console.log(item);
      }
    }
  ];

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
  }

  onSelect_Formula(item) {
    console.log(item);
  }

  onClick_AddFeedstuff() {
    this.feedstufffs.push({
      selectedFeedstuff: null,
      mininum: 0,
      maximum: 1000,
      cost: 4000,
      onSelect_Feedstuff: (item, instance) => {
        console.log(item);
      }
    });
  }

  onClick_RemoveFeedstuff(item) {
    this.feedstufffs.splice(this.feedstufffs.indexOf(item),1);
  }

}
