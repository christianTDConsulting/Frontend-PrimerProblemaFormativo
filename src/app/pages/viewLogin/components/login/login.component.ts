import { Component, OnInit, Input  } from '@angular/core';
import { Validators,FormControl,FormGroup } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { TokenService } from 'src/app/services/token/token.service'; 
import { Router } from '@angular/router';
import { AuthEventService } from 'src/app/services/auth-event/auth-event.service';
import { Usuario } from 'src/app/models/cliente';
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
     private loginService: TokenService,
     private messageService: MessageService,
     private tokenService: TokenService,
     private authEventService: AuthEventService,
     private router: Router
     ) { }

  get email() {
    return this.loginForm.controls['email'];
  }
  get password() { return this.loginForm.controls['password']; }

  ngOnInit() {
  }

  loginUser() { 
    this.tokenService.verificarUsuario(this.email.value, this.password.value).subscribe(
      response => {
       
        
        if (response) { 
          console.log(response.token);
          
          this.loginService.setToken(response.token);
          this.messageService.add({severity:'success', summary: 'Login', detail: 'Login exitoso'});
          //cambiar a vista  
          this.loginService.decodeToken().subscribe(
            response => {
              if (response.usuario===null || response.usuario===undefined){
                this.messageService.add({severity:'info', summary: 'Login', detail: 'No hay cliente asociado al usuario'});
              }else{
                this.authEventService.emitLoginEvent();
                this.setInfoInLocalStorage(response.usuario);
                
                const perfil = response.usuario.id_perfil;
                if (perfil === 1){
                  this.router.navigate(['/viewClient']);
                }else if (perfil === 2){
                  this.router.navigate(['/viewAdmin']);
                }
              }
             
            }
          )       
        }
       
      },error => {
        if (error.status === 403) {
          this.messageService.add({severity:'error', summary: 'Bloqueado', detail: 'Espere 5 minutos e intentelo de nuevo.'});
        }else{
          console.log(error);
          this.messageService.add({severity:'error', summary: 'Login', detail: 'Credenciales incorrectas'});
        }
       
      }
      
      );
    
  }

  setInfoInLocalStorage(usuario:Usuario){
  
    if (usuario.id!= null){
      localStorage.setItem('user_id', usuario.id!.toString());
    }
  }

  goToRegister() {
    this.state.set('register');
  }
}
