/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { TokenService } from './token.service';

describe('Service: Token', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoginService]
    });
  });

  it('should ...', inject([LoginService], (service: LoginService) => {
    expect(service).toBeTruthy();
  }));
});
