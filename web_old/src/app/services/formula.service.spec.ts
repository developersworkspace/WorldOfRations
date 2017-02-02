/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { FormulaService } from './formula.service';

describe('FormulaService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FormulaService]
    });
  });

  it('should ...', inject([FormulaService], (service: FormulaService) => {
    expect(service).toBeTruthy();
  }));
});
