/* tslint:disable:no-unused-variable */
import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { FormulatorComponent } from './formulator.component';

describe('FormulatorComponent', () => {
  let component: FormulatorComponent;
  let fixture: ComponentFixture<FormulatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormulatorComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormulatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
