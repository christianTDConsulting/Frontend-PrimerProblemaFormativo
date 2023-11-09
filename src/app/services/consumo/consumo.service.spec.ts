import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import {HttpClientModule} from '@angular/common/http';
import { ConsumoService } from './consumo.service';

describe('ConsumoService', () => {
  let service: ConsumoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], 
      providers: [ConsumoService],
    });
    service = TestBed.inject(ConsumoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
