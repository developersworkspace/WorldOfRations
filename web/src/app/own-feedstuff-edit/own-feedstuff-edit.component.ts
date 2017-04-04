import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

// Services
import { OwnFeedstuffsService } from '../services/own-feedstuffs.service';

@Component({
  selector: 'app-own-feedstuff-edit',
  templateUrl: './own-feedstuff-edit.component.html',
  styleUrls: ['./own-feedstuff-edit.component.css']
})
export class OwnFeedstuffEditComponent implements OnInit {

  feedstuff: any = null;
  elements: any[] = [];

  constructor(private activatedRoute: ActivatedRoute, private ownFeedstuffsService: OwnFeedstuffsService) { }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      let feedstuffId = params['feedstuffId'];
      this.ownFeedstuffsService.getFeedstuff(feedstuffId).subscribe((getFeedstuffResult: any) => {
        this.feedstuff = getFeedstuffResult;
      });
    });

    this.ownFeedstuffsService.listElements().subscribe((listElementsResult: any[]) => {
      this.elements = listElementsResult;
    });
  }

}
