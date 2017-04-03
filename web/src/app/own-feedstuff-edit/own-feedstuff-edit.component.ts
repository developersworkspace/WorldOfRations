import { Component, OnInit } from '@angular/core';

// Services
import { OwnFeedstuffsService } from '../services/own-feedstuffs.service';

@Component({
  selector: 'app-own-feedstuff-edit',
  templateUrl: './own-feedstuff-edit.component.html',
  styleUrls: ['./own-feedstuff-edit.component.css']
})
export class OwnFeedstuffEditComponent implements OnInit {

  elements: any[] = [];

  constructor(private ownFeedstuffsService: OwnFeedstuffsService) { }

  ngOnInit() {
    this.ownFeedstuffsService.listElements().subscribe((listElementsResult: any[]) => {
      this.elements = listElementsResult;
    });
  }

}
