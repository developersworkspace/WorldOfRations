import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import config from './../config';

@Injectable()
export class FeedstuffService {

  constructor(private http: Http) { }

  public listFeedstuffs() {
    return this.http.get(config.api.uri + '/api/feedstuff/list')
      .map((res: Response) => res.json());
  }

  public getSuggestedValues(formulaId: string, feedstuffId: string) {
    return this.http.get(config.api.uri + '/api/feedstuff/suggestedValues?formulaId=' + formulaId + '&feedstuffId=' + feedstuffId)
      .map((res: Response) => res.json());
  }

  public listExampleFeedstuffs() {
    return this.http.get(config.api.uri + '/api/feedstuff/listExample')
      .map((res: Response) => {
        let result: any[] = res.json();
        let resultArr: any[] = []

        for (let i = 0; i < result.length; i++) {
          resultArr.push({
            selectedFeedstuff: {
              id: result[i].id,
              name: result[i].name,
              searchText: result[i].searchText
            },
            minimum: result[i].minimum,
            maximum: result[i].maximum,
            cost: result[i].cost,
            isLoading: false
          });
        }

        return resultArr;
      });
  }
}
