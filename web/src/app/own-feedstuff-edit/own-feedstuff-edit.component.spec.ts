/* tslint:disable:no-unused-variable */
import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { OwnFeedstuffEditComponent } from './own-feedstuff-edit.component';

describe('OwnFeedstuffEditComponent', () => {
  let component: OwnFeedstuffEditComponent;
  let fixture: ComponentFixture<OwnFeedstuffEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OwnFeedstuffEditComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OwnFeedstuffEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
