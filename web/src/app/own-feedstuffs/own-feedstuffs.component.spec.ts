/* tslint:disable:no-unused-variable */
import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { OwnFeedstuffsComponent } from './own-feedstuffs.component';

describe('OwnFeedstuffsComponent', () => {
  let component: OwnFeedstuffsComponent;
  let fixture: ComponentFixture<OwnFeedstuffsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OwnFeedstuffsComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OwnFeedstuffsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
