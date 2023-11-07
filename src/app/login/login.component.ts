import { Component, OnInit, Input  } from '@angular/core';
import { Validators,FormControl,FormGroup } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { LoginService } from '../services/login.service';
import {Log} from '../models/log';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


 @Input () state:any  

  loginForm: FormGroup = new FormGroup({
    email : new FormControl('', [Validators.required, Validators.pattern("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$")]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8), //  longitud mínima
     // Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&!])[A-Za-z\d@#$%^&!]*$/), // Exige diversidad de caracteres
      //Validators.pattern(/^(?![\d]+$)(?![a-zA-Z]+$)(?![^a-zA-Z\d]+$).{8,}$/) // Evita palabras comunes y datos personales
    ]),

  });
    

  constructor(
     private loginService: LoginService,
     private messageService: MessageService,
     ) { }

  get email() {
    return this.loginForm.controls['email'];
  }
  get password() { return this.loginForm.controls['password']; }

  ngOnInit() {
  }

  loginUser() { 
    this.loginService.verificarUsuario(this.email.value, this.password.value).subscribe(
      response => {
       
        
        if (response.message === 'Credenciales correctas') { //cambiarlo a si el response.status === 200
          console.log(response.message);
          //CREAR LOG DE INICIO DE SESION falta completar

          this.state.set('view');
          this.messageService.add({severity:'success', summary: 'Login', detail: 'Login exitoso'});
         
        }else{
          console.log(response.message);
          this.messageService.add({severity:'error', summary: 'Login', detail: 'Credenciales incorrectas'});
        }
       
      },);
    
  }

  goToRegister() {
    this.state.set('register');
  }
}
