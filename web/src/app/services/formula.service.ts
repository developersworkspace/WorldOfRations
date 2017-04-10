import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions, Response } from '@angular/http';
import {Observable} from 'rxjs/Observable';

// Import RxJs required methods
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { environment } from './../../environments/environment';
import { BaseService } from './baseService';

import { Formula } from './../models/formula';

@Injectable()
export class FormulaService extends BaseService {

  constructor(http: Http) {
    super(http);
   }

  public listFormulas(): Observable<Formula[]>  {
    return this.get(environment.api.uri + '/api/formula/listFormula')
      .map((res: Response) => res.json());
  }

}
