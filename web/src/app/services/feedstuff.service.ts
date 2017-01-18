import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class FeedstuffService {

  constructor(private http: Http) { }

  public listFeedstuff() {
    return this.http.get('http://localhost:9001/api/feedstuff/list')
      .map((res: Response) => res.json());
  }

  public getSuggestedValues(formulaId: string, feedstuffId: string) {
    return this.http.get('http://localhost:9001/api/feedstuff/suggestedValues?formulaId=' + formulaId + '&feedstuffId=' + feedstuffId)
      .map((res: Response) => res.json());
  }

}
