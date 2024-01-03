/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ImagesCheckerHistorialDataViewComponent } from './imagesCheckerHistorialDataView.component';

describe('ImagesCheckerHistorialDataViewComponent', () => {
  let component: ImagesCheckerHistorialDataViewComponent;
  let fixture: ComponentFixture<ImagesCheckerHistorialDataViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImagesCheckerHistorialDataViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImagesCheckerHistorialDataViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
