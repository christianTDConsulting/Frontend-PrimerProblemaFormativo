import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { viewClienteGuard } from './view-cliente.guard';

describe('viewClienteGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => viewClienteGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
