import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import config from './../config';

@Injectable()
export class FormulaService {


  private feedstuffs: any[] = [
    {
      id: 1,
      name: 'Test',
      searchText: 'test hello world'
    }
  ];


  constructor(private http: Http) { }

  public listFormula() {
    return this.http.get(config.api.uri + '/api/formula/list')
      .map((res: Response) => res.json());
  }

}
