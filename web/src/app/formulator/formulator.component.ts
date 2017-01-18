import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-formulator',
  templateUrl: './formulator.component.html',
  styleUrls: ['./formulator.component.css']
})
export class FormulatorComponent implements OnInit {

  formulationsList: any[] = [
    {
      id: 1,
      name: 'Test',
      searchText: 'test hello world'
    }
  ];
  feedstufffsList: any[] = [
    {
      id: 1,
      name: 'Test',
      searchText: 'test hello world'
    }
  ];

  feedstufffs: any[] = [
    {
      selectedFeedstuff: null,
      onSelect_Feedstuff: (x) => {
        console.log(x);
      }
    }
  ];

  selectedFormulation: any = null;

  constructor() { }

  ngOnInit() {

  }

  onSelect_Formulation(item) {
    console.log(item);
  }

}
