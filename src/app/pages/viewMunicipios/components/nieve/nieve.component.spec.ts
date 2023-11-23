/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { NieveComponent } from './nieve.component';

describe('NieveComponent', () => {
  let component: NieveComponent;
  let fixture: ComponentFixture<NieveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NieveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NieveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
