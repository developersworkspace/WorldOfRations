import { Component, OnInit } from '@angular/core';

// Services
import { OwnFeedstuffsService } from '../services/own-feedstuffs.service';

@Component({
  selector: 'app-own-feedstuffs',
  templateUrl: './own-feedstuffs.component.html',
  styleUrls: ['./own-feedstuffs.component.css']
})
export class OwnFeedstuffsComponent implements OnInit {

  private feedstuffs: any[] = [];
  private currentTimestamp = new Date();

  private newFeedstuff: any = {
    name: null
  };

  constructor(private ownFeedstuffsService: OwnFeedstuffsService) { }

  ngOnInit() {
    this.ownFeedstuffsService.listFeedstuffsForUser().subscribe((result: any[]) => {
      this.feedstuffs = result;
    }, (error: Error) => {
      //this.errorMessage = 'An error has occurred while loading feedstuff';
    });
  }

  onClick_CreateFeedstuff() {

    this.ownFeedstuffsService.createFeedstuffForUser(this.newFeedstuff.name, null).subscribe((result: any[]) => {
      console.log(result);
    }, (error: Error) => {
      //this.errorMessage = 'An error has occurred while loading feedstuff';
    });

    this.newFeedstuff.name = null;
  }

}
