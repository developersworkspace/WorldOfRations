import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { environment } from './../../environments/environment';
import { BaseService } from './baseService'; 

@Injectable()
export class FormulaService extends BaseService {

  constructor(http: Http) {
    super(http);
   }

  public listFormulas() {
    return this.get(environment.api.uri + '/api/formula/listFormula')
      .map((res: Response) => res.json());
  }

}
