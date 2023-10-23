import { TestBed } from '@angular/core/testing';

import { ConsumoService } from './consumo.service';

describe('ConsumoService', () => {
  let service: ConsumoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConsumoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
