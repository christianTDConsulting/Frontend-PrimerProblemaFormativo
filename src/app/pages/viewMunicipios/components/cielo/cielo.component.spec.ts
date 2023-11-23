/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CieloComponent } from './cielo.component';

describe('CieloComponent', () => {
  let component: CieloComponent;
  let fixture: ComponentFixture<CieloComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CieloComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CieloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
