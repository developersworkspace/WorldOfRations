import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import config from './../config';

@Injectable()
export class FormulatorService {

  constructor(private http: Http) { }

  public formulate(obj: any) {
    return this.http.post(config.api.uri + '/api/formulator/formulate', obj)
      .map((res: Response) => res.json());
  }

}
