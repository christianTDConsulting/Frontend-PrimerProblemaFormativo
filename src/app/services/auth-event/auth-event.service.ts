// auth-event.service.ts

import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthEventService {
  loginEvent = new EventEmitter<void>();
  logoutEvent = new EventEmitter<void>();

  emitLoginEvent(): void {
    this.loginEvent.emit();
  }

  emitLogoutEvent(): void {
    this.logoutEvent.emit();
  }
}
