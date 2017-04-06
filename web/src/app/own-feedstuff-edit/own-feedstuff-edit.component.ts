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
      this.ownFeedstuffsService.findUserFeedstuff(feedstuffId).subscribe((getFeedstuffResult: any) => {
        this.feedstuff = getFeedstuffResult;
        this.feedstuff.id = feedstuffId;

        this.ownFeedstuffsService.listUserFeedstuffMeasurements(feedstuffId).subscribe((listMeasurementsResult: any[]) => {
          this.elements = listMeasurementsResult;
        });

      });
    });
  }

  onClick_Save() {
    this.ownFeedstuffsService.saveUserFeedstuffMeasurements(this.feedstuff.id, this.elements.map(x => {
      return {
        id: x.id,
        value: x.value
      };
    })).subscribe((saveUserFeedstuffMeasurementsResult: Boolean) => {
      window.location.href = '/ownfeedstuffs';
    });
  }

}
