/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { HumedadComponent } from './humedad.component';

describe('HumedadComponent', () => {
  let component: HumedadComponent;
  let fixture: ComponentFixture<HumedadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HumedadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HumedadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
