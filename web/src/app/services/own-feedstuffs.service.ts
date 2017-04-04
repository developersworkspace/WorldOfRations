import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { environment } from './../../environments/environment';
import { BaseService } from './baseService';

@Injectable()
export class OwnFeedstuffsService extends BaseService {

  constructor(http: Http) {
    super(http);
  }

  public listFeedstuffsForUser() {
    return this.get(environment.api.uri + '/api/feedstuff/listForUser')
      .map((res: Response) => res.json());
  }

  public createFeedstuffForUser(name: string, description: string) {
    return this.post(environment.api.uri + '/api/feedstuff/createForUser', {
      name: name,
      description: description
    })
      .map((res: Response) => res.json());
  }

  public listMeasurements(feedstuffId: string) {
    return this.get(environment.api.uri + `/api/feedstuff/listMeasurements?feedstuffId=${feedstuffId}`)
      .map((res: Response) => res.json());
  }

  public getFeedstuff(feedstuffId: string) {
    return this.get(environment.api.uri + `/api/feedstuff/get?feedstuffId=${feedstuffId}`)
      .map((res: Response) => res.json());
  }

  public saveUserFeedstuffMeasurements(feedstuffId: string, measurements: any[]) {
    return this.post(environment.api.uri + `/api/feedstuff/saveUserFeedstuffMeasurements`, {
      feedstuffId: feedstuffId,
      measurements: measurements
    })
      .map((res: Response) => res.json());
  }

}
