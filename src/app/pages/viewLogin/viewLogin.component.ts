
import { Component, OnInit, Input, signal  } from '@angular/core';

@Component({
  selector: 'app-viewLogin',
  templateUrl: './viewLogin.component.html',
  styleUrls: ['./viewLogin.component.css']
})
export class ViewLoginComponent  {

  
 
  state = signal<'register' | 'login' >('login');
   
   constructor( ) { }
 
    
   

}
