/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AuthEventService } from './auth-event.service';

describe('Service: AuthEvent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthEventService]
    });
  });

  it('should ...', inject([AuthEventService], (service: AuthEventService) => {
    expect(service).toBeTruthy();
  }));
});
