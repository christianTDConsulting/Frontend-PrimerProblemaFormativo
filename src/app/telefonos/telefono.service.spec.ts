import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import {HttpClientModule} from '@angular/common/http';
import { TelefonoService } from './telefono.service';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';


describe('TelefonoService', () => {
  let service: TelefonoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, TableModule, ToastModule], 
      providers: [TelefonoService],
    });
    service = TestBed.inject(TelefonoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
