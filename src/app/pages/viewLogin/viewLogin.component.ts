
import { Component, signal  } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-viewLogin',
  templateUrl: './viewLogin.component.html',
  styleUrls: ['./viewLogin.component.css']
})
export class ViewLoginComponent  {

  
 
  state = signal<'register' | 'login' >('login');
   
  constructor(   private router: Router ) { }
 
    
   handleLoginSuccess(eventData:any){
    console.log(eventData);
    if (eventData == 1){
      console.log('Navegando a /viewClient');
      this.router.navigate(['/viewClient']);
    }else if (eventData == 2){
      console.log('Navegando a /viewAdmin');
      this.router.navigate(['/viewAdmin']);
    }
  }

}
