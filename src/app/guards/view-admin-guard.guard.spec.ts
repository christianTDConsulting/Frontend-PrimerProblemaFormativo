import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { viewAdminGuardGuard } from './view-admin-guard.guard';

describe('viewAdminGuardGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => viewAdminGuardGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
