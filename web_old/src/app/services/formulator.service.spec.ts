/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { FormulatorService } from './formulator.service';

describe('FormulatorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FormulatorService]
    });
  });

  it('should ...', inject([FormulatorService], (service: FormulatorService) => {
    expect(service).toBeTruthy();
  }));
});
