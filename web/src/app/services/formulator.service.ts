import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { environment } from './../../environments/environment';
import { BaseService } from './baseService'; 

@Injectable()
export class FormulatorService extends BaseService {

  constructor(http: Http) {
    super(http);
   }

  public formulate(obj: any) {
    return this.post(environment.api.uri + '/api/formulator/formulate', obj)
    .map((res: Response) => res.json());
  }

  public getFormulation(formulationId: string) {
    return this.get(environment.api.uri + '/api/formulator/formulation?formulationId=' + formulationId)
    .map((res: Response) => res.json());
  }

}
