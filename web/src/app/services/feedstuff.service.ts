import { Injectable } from '@angular/core';

import {Observable} from 'rxjs/Observable';

@Injectable()
export class FeedstuffService {


  private feedstuffs: any[] = [
    {
      id: 1,
      name: 'Test',
      searchText: 'test hello world'
    }
  ];

  constructor() { }

  public getFeedstuff() {
    return new Observable(observer => {
      observer.next(this.feedstuffs);
    });
  }

}
