import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

// Import RxJs required methods
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { environment } from './../../environments/environment';
import { BaseService } from './baseService';

import { Feedstuff } from './../models/feedstuff';

@Injectable()
export class FeedstuffService extends BaseService {

  constructor(http: Http) {
    super(http);
   }

  public listFeedstuffs(): Observable<Feedstuff[]> {
    return this.get(environment.api.uri + '/api/feedstuff/listFeedstuffs')
      .map((res: Response) => res.json());
  }

  public findSuggestedValues(formulaId: string, feedstuffId: string) {
    return this.get(environment.api.uri + '/api/feedstuff/findSuggestedValues?formulaId=' + formulaId + '&feedstuffId=' + feedstuffId)
      .map((res: Response) => res.json());
  }

  public listExampleFeedstuffs() {
    return this.get(environment.api.uri + '/api/feedstuff/listExampleFeedstuffs')
      .map((res: Response) => {
        const result: any[] = res.json();
        const resultArr: any[] = [];

        for (let i = 0; i < result.length; i++) {
          resultArr.push({
            selectedFeedstuffName: result[i].name,
            selectedFeedstuff: {
              id: result[i].id,
              name: result[i].name,
              searchText: result[i].searchText,
            },
            minimum: result[i].minimum,
            maximum: result[i].maximum,
            cost: result[i].cost,
            isLoading: false,
          });
        }

        return resultArr;
      });
  }
}
