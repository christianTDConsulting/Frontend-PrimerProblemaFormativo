/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ImageCheckerService } from './imageChecker.service';

describe('Service: ImageChecker', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ImageCheckerService]
    });
  });

  it('should ...', inject([ImageCheckerService], (service: ImageCheckerService) => {
    expect(service).toBeTruthy();
  }));
});
