/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { MailerService } from './mailer.service';

describe('Service: Mailer', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MailerService]
    });
  });

  it('should ...', inject([MailerService], (service: MailerService) => {
    expect(service).toBeTruthy();
  }));
});
