import { Component, OnInit } from '@angular/core';

// Services
import { OwnFeedstuffsService } from '../services/own-feedstuffs.service';

@Component({
  selector: 'app-own-feedstuffs',
  templateUrl: './own-feedstuffs.component.html',
  styleUrls: ['./own-feedstuffs.component.css'],
})
export class OwnFeedstuffsComponent implements OnInit {

  public feedstuffs: any[] = [];
  public currentTimestamp = new Date();

  public errorMessage = null;

  public newFeedstuff: any = {
    name: null,
    errorMessage: null,
  };

  constructor(private ownFeedstuffsService: OwnFeedstuffsService) { }

  public ngOnInit() {
    this.ownFeedstuffsService.listFeedstuffsForUser().subscribe((result: any[]) => {
      this.feedstuffs = result;
    }, (error: Error) => {
      this.errorMessage = 'An error has occurred while loading feedstuff';
    });
  }

  public onClick_CreateFeedstuff() {

    if (this.newFeedstuff.name == null) {
      this.newFeedstuff.errorMessage = 'Please enter a name';
      return;
    }
    this.ownFeedstuffsService.createFeedstuffForUser(this.newFeedstuff.name, null).subscribe((result: any) => {
      window.location.href = `/ownfeedstuffedit?feedstuffId=${result.id}`;
    }, (error: Error) => {
      this.newFeedstuff.errorMessage = 'An error has occurred while creating feedstuff';
    });

    this.newFeedstuff.name = null;
  }

  public onClick_EditFeedstuff(item: any) {
    window.location.href = `/ownfeedstuffedit?feedstuffId=${item.id}`;
  }

}
