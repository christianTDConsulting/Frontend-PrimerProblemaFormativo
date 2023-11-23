/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { VientoComponent } from './viento.component';

describe('VientoComponent', () => {
  let component: VientoComponent;
  let fixture: ComponentFixture<VientoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VientoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
