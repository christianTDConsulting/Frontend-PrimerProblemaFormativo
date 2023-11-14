/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { NavigationServiceService } from './NavigationService.service';

describe('Service: NavigationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NavigationServiceService]
    });
  });

  it('should ...', inject([NavigationServiceService], (service: NavigationServiceService) => {
    expect(service).toBeTruthy();
  }));
});
