import { Component, signal } from '@angular/core';

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
