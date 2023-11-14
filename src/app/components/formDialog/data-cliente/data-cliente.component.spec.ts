import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import {HttpClientModule} from '@angular/common/http';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { ConfirmationService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { TableModule } from 'primeng/table';
import { DataClienteComponent } from './data-cliente.component';

describe('DataClienteComponent', () => {
  let component: DataClienteComponent;
  let fixture: ComponentFixture<DataClienteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DataClienteComponent],
      imports: [HttpClientTestingModule, , ToastModule, TableModule], 
      providers: [DataClienteComponent, ConfirmationService, DynamicDialogConfig],
    });
    fixture = TestBed.createComponent(DataClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
