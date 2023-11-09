import { Component, OnInit, Input  } from '@angular/core';
import { Validators,FormControl,FormGroup } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { LoginService } from '../../../../services/login.service';
import {Log} from '../../../../models/log';
import { Router } from '@angular/router';
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
     // Validators.minLength(8), //  longitud mínima
     // Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&!])[A-Za-z\d@#$%^&!]*$/), // Exige diversidad de caracteres
      //Validators.pattern(/^(?![\d]+$)(?![a-zA-Z]+$)(?![^a-zA-Z\d]+$).{8,}$/) // Evita palabras comunes y datos personales
    ]),

  });
    

  constructor(
     private loginService: LoginService,
     private messageService: MessageService,
     private router: Router
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
       
        
        if (response) { 
          console.log(response.message, response.token);
          //CREAR LOG DE INICIO DE SESION falta completar
          this.loginService.setToken(response.token);
          this.messageService.add({severity:'success', summary: 'Login', detail: 'Login exitoso'});
          //cambiar a vista  
          this.loginService.decodeToken().subscribe(
            response => {
              const perfil = response.usuario.id_perfil;
              if (perfil === 1){
                this.router.navigate(['/viewClient']);
              }else if (perfil === 2){
                this.router.navigate(['/viewAdmin']);
              }
            }
          )       
        }
       
      },error => {
        console.log(error);
        this.messageService.add({severity:'error', summary: 'Login', detail: 'Credenciales incorrectas'});
      }
      
      );
    
  }

  goToRegister() {
    this.state.set('register');
  }
}
