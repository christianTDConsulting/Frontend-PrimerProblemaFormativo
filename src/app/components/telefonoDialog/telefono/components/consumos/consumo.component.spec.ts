/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ConfirmationService } from 'primeng/api';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import {HttpClientModule} from '@angular/common/http';
import { ConsumoComponent } from './consumo.component';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { ToastModule } from 'primeng/toast';
import { TableModule } from 'primeng/table';
import { of } from 'rxjs';
import { ConsumoService } from '../../../../../services/consumo/consumo.service';
import { Consumo } from '../../../../../models/consumo';

describe('ConsumoComponent', () => {
  let component: ConsumoComponent;
  let fixture: ComponentFixture<ConsumoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsumoComponent ],
      imports: [HttpClientTestingModule, ToastModule, TableModule],
      providers: [ConsumoComponent, ConfirmationService, DynamicDialogConfig]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsumoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
