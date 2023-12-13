/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ArticuloService } from './articulo.service';

describe('Service: Articulo', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ArticuloService]
    });
  });

  it('should ...', inject([ArticuloService], (service: ArticuloService) => {
    expect(service).toBeTruthy();
  }));
});
