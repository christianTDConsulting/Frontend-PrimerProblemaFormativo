/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { EmpresaService } from './empresa.service';

describe('Service: Empresa', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EmpresaService]
    });
  });

  it('should ...', inject([EmpresaService], (service: EmpresaService) => {
    expect(service).toBeTruthy();
  }));
});
