/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { MetereologiaService } from './metereologia.service';

describe('Service: Metereologia', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MetereologiaService]
    });
  });

  it('should ...', inject([MetereologiaService], (service: MetereologiaService) => {
    expect(service).toBeTruthy();
  }));
});
