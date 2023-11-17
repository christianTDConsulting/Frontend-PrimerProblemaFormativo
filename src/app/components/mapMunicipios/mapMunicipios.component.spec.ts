/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { MapMunicipiosComponent } from './mapMunicipios.component';

describe('MapMunicipiosComponent', () => {
  let component: MapMunicipiosComponent;
  let fixture: ComponentFixture<MapMunicipiosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapMunicipiosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapMunicipiosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
