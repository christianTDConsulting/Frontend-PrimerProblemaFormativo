import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NavigationServiceService {

constructor() { 
  window.addEventListener('beforeunload', () => {
    localStorage.setItem('lastVisitedRoute', window.location.pathname);
  });
}

}
