import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import {HttpClientModule} from '@angular/common/http';
import { TelefonosComponent } from './telefonos.component';
import { DynamicDialogConfig, DynamicDialogRef  } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api'
import { ConfirmationService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { TableModule } from 'primeng/table';


describe('TelefonosComponent', () => {
  let component: TelefonosComponent;
  let fixture: ComponentFixture<TelefonosComponent>;

  beforeEach(() => {
    const fakeId = 1; // Puedes ajustar este valor según tus necesidades

    TestBed.configureTestingModule({
      declarations: [TelefonosComponent],
      imports: [HttpClientTestingModule, ToastModule, TableModule], 
      providers:[{ provide: 'id', useValue: fakeId }, 
                  DynamicDialogConfig, TelefonosComponent, ConfirmationService, MessageService],
    });
    fixture = TestBed.createComponent(TelefonosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
