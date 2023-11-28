
import { Component, signal  } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-viewLogin',
  templateUrl: './viewLogin.component.html',
  styleUrls: ['./viewLogin.component.css']
})
export class ViewLoginComponent  {

  
 
  state = signal<'register' | 'login' >('login');
   
  constructor( private router: Router ) { }
 
    
  goToMetereology(){
    this.router.navigate(['/viewMetereologia']);
  } 

  goToEmpresas(){
    this.router.navigate(['/viewEmpresas']);
  } 

}
