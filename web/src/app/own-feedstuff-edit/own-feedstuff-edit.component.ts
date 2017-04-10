import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

// Services
import { OwnFeedstuffsService } from '../services/own-feedstuffs.service';

@Component({
  selector: 'app-own-feedstuff-edit',
  templateUrl: './own-feedstuff-edit.component.html',
  styleUrls: ['./own-feedstuff-edit.component.css'],
})
export class OwnFeedstuffEditComponent implements OnInit {

  public feedstuff: any = null;
  public elements: any[] = [];

  constructor(private activatedRoute: ActivatedRoute, private ownFeedstuffsService: OwnFeedstuffsService) { }

  public ngOnInit() {
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      const feedstuffId = params['feedstuffId'];
      this.ownFeedstuffsService.findUserFeedstuff(feedstuffId).subscribe((getFeedstuffResult: any) => {
        this.feedstuff = getFeedstuffResult;
        this.feedstuff.id = feedstuffId;

        this.ownFeedstuffsService.listUserFeedstuffMeasurements(feedstuffId).subscribe((listMeasurementsResult: any[]) => {
          this.elements = listMeasurementsResult;
        });

      });
    });
  }

  public onClick_Save() {
    this.ownFeedstuffsService.saveUserFeedstuffMeasurements(this.feedstuff.id, this.elements.map((x) => {
      return {
        id: x.id,
        value: x.value,
      };
    })).subscribe((saveUserFeedstuffMeasurementsResult: boolean) => {
      window.location.href = '/ownfeedstuffs';
    });
  }

}
