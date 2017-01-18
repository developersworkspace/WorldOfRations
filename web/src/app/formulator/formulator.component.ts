import { Component, OnInit } from '@angular/core';

// Services
import { FeedstuffService } from '../services/feedstuff.service';

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

  selectedFormulation: any = null;

  constructor(private feedstuffService: FeedstuffService) { }

  ngOnInit() {
    this.feedstuffService.getFeedstuff().subscribe((x: any[]) => {
      this.feedstufffsList = x;
      console.log(x);
    });
  }

  onSelect_Formulation(item) {
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
