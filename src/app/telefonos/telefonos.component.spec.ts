import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import {HttpClientModule} from '@angular/common/http';
import { TelefonosComponent } from './telefonos.component';
import { DynamicDialogConfig, DynamicDialogRef  } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api'




describe('TelefonosComponent', () => {
  let component: TelefonosComponent;
  let fixture: ComponentFixture<TelefonosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TelefonosComponent],
      imports: [HttpClientTestingModule], 
      providers:[DynamicDialogRef,DynamicDialogConfig, TelefonosComponent, MessageService],
    });
    fixture = TestBed.createComponent(TelefonosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
