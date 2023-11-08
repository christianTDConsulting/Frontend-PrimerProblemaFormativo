import { Component, signal } from '@angular/core';
// Reemplaza con tu servicio de autenticación
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'application';
  state = signal<'register' | 'login' | 'view' | 'viewAdmin'>('login');

  constructor() {
    
  }
  
  
}
