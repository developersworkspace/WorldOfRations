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

  private errorMessage = null;

  private newFeedstuff: any = {
    name: null,
    errorMessage: null
  };

  constructor(private ownFeedstuffsService: OwnFeedstuffsService) { }

  ngOnInit() {
    this.ownFeedstuffsService.listFeedstuffsForUser().subscribe((result: any[]) => {
      this.feedstuffs = result;
    }, (error: Error) => {
      this.errorMessage = 'An error has occurred while loading feedstuff';
    });
  }

  onClick_CreateFeedstuff() {

    if (this.newFeedstuff.name == null) {
      this.newFeedstuff.errorMessage = 'Please enter a name';
      return;
    }
    this.ownFeedstuffsService.createFeedstuffForUser(this.newFeedstuff.name, null).subscribe((result: any[]) => {
      console.log(result);
    }, (error: Error) => {
      this.newFeedstuff.errorMessage = 'An error has occurred while creating feedstuff';
    });

    this.newFeedstuff.name = null;
  }

  onClick_EditFeedstuff(item: any) {
    window.location.href = `/ownfeedstuffedit?id=${item.id}`;
  }

}
