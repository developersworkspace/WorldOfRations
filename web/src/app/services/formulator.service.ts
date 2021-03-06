import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

// Import RxJs required methods
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { environment } from './../../environments/environment';
import { BaseService } from './baseService';

import { Formulation } from './../models/formulation';

@Injectable()
export class FormulatorService extends BaseService {

  constructor(http: Http) {
    super(http);
   }

  public formulate(obj: any) {
    return this.post(environment.api.uri + '/api/formulator/formulate', obj)
    .map((res: Response) => res.json());
  }

  public findFormulation(formulationId: string): Observable<Formulation> {
    return this.get(environment.api.uri + '/api/formulator/findFormulation?formulationId=' + formulationId)
    .map((res: Response) => res.json());
  }

  public listFormulations(): Observable<Formulation[]> {
    return this.get(environment.api.uri + '/api/formulator/listFormulations')
    .map((res: Response) => res.json());
  }

}
