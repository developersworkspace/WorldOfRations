/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { OwnFeedstuffsService } from './own-feedstuffs.service';

describe('OwnFeedstuffsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OwnFeedstuffsService]
    });
  });

  it('should ...', inject([OwnFeedstuffsService], (service: OwnFeedstuffsService) => {
    expect(service).toBeTruthy();
  }));
});
