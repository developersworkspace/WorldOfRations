/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { FeedstuffService } from './feedstuff.service';

describe('FeedstuffService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FeedstuffService]
    });
  });

  it('should ...', inject([FeedstuffService], (service: FeedstuffService) => {
    expect(service).toBeTruthy();
  }));
});
