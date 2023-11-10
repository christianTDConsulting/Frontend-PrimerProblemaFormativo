import { Component, OnInit, Input,Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { Cliente } from '../../models/cliente';
import { ClienteService } from '../../services/cliente/cliente.service';
import { MessageService } from 'primeng/api';
import {TelefonoService} from '../../services/telefono/telefono.service';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';
import { TokenService } from 'src/app/services/token/token.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-usuarioForm',
  templateUrl: './usuarioForm.component.html',
  styleUrls: ['./usuarioForm.component.css']
})
export class UsuarioFormComponent implements OnInit {
  @Input() clienteId: any; // si me pasan un clienteId tengo token
  @Input () state:any  // si me pasan el estado, no tengo token
  @Output() cerrarDialog = new EventEmitter<any>();

  editar: boolean = false;
  cliente: Cliente = {
    id:undefined,
    nombre: '',
    usuario: {
      id: undefined,
      email: '',  
      password: '',
      id_perfil: 1,
    },
    bio: '',
    nacimiento: new Date(),
    
  };
  nuevoTelefono="";

  
 equivalentValidator = (firstControlName: string, secondControlName: string): ValidatorFn => {
  return (control: AbstractControl): ValidationErrors | null => {
    const firstControl = control.get(firstControlName);
    const secondControl = control.get(secondControlName);

    if (secondControl && secondControl.value !== firstControl?.value) {
      return { notEqual: true };
    }

    return null;
  };
};
  
  profileForm: FormGroup = new FormGroup({
    nombre: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    //email: new FormControl('', [Validators.required, Validators.email]),
    email : new FormControl('', [Validators.required, Validators.pattern("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$")]),
    bio: new FormControl('',[ Validators.maxLength(200)] ),
    nacimiento: new FormControl(new Date("2000-01-01T00:00:00Z"), Validators.required),
    telefono: new FormControl('',[ Validators.pattern("^[0-9]{3}-[0-9]{3}-[0-9]{3}$")] ),
    password: new FormControl('', ),
   
    password2: new FormControl('', ), 
    //En caso de editar, no son obligatorios
   
  },{

    validators:[ this.equivalentValidator('password', 'password2')]
   
  });
 
 
  get email() { return this.profileForm.controls['email']; }
  get nombre() { return this.profileForm.controls['nombre']; }
  get bio() { return this.profileForm.controls['bio']; }
  get nacimiento() { return this.profileForm.controls['nacimiento']; }
  get telefono() { return this.profileForm.controls['telefono']; }
  get password() { return this.profileForm.controls['password']; }
  get password2() { return this.profileForm.controls['password']; }
  constructor(
   
    private clienteService: ClienteService,
    private usuarioService: UsuarioService,
    public messageService : MessageService,
    public telefonoService: TelefonoService,
    private router: Router,
    private tokenService: TokenService
  
   
  ) { }

  
  ngOnInit(): void {
  
    
    if (this.clienteId !== undefined) {
      
      console.log("edit");
      this.initFormControlEdit();
      this.editar = true;
      this.initParams(this.clienteId);
      
    
    }else{
      this.initFormControlRegister();
     
      console.log("create");
      this.editar = false;
    }
   

  }
  //PRIVADOS
private initFormControlRegister(){
  this.profileForm.get('password')?.setValidators([
    Validators.required,
    Validators.minLength(8),   //longitud mínima
    Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).*/), //al menos un numero, una mayuscula y una minuscula 
  ]);
  this.profileForm.get('password2')?.setValidators([
    Validators.required,
  ]);
}
private initFormControlEdit(){
  this.profileForm.get('password')?.setValidators([
   
    Validators.minLength(8),   //longitud mínima
    Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).*/), //al menos un numero, una mayuscula y una minuscula 
  ]);
  this.profileForm.get('password2')?.setValidators([
  
  ]);
  
}
   
   
   //El componente de calendario de primeNG, devuelve la hora del navegador en este caso Europa, por lo tanto, hago esta función para cambiar a GMT que es la fecha de la bbdd
  private dateIsUTC (fecha:Date) {
    // Verifica si la fecha tiene una zona horaria GMT
    if (fecha.toTimeString().includes('Z')) {
      // La fecha ya tiene una zona horaria GMT, no es necesario hacer nada
      return fecha;
    } else  {

      const utcDate = new Date(fecha);
      utcDate.setMinutes(utcDate.getMinutes() - fecha.getTimezoneOffset());
      
      return utcDate;
    }
  }



  private updateCliente() {
    const { telefono, nacimiento, email, password, ...restoCliente } = this.profileForm.value;
    
    // Ensure this.cliente.usuario is initialized
    this.cliente.usuario = this.cliente.usuario || {};
  
    this.cliente = {
      ...restoCliente,
      usuario: {
        ...this.cliente.usuario,
        email: email,
        password: password,
      },
      nacimiento: this.dateIsUTC(nacimiento),
      id: this.clienteId,
    };
    this.nuevoTelefono = telefono;
  }
  

  //METODOS
  initParams(id:number){
    this.clienteService.getCliente(id).subscribe(
      response => {

       this.cliente = response;
       console.log("tiempo obtenido: " + response.nacimiento);
       

       this.profileForm.patchValue({
        nombre: this.cliente.nombre,
        email: this.cliente.usuario.email,
        bio: this.cliente.bio,
        nacimiento: new Date(this.cliente.nacimiento),
      });

      });
  }

  crearUsuario(){

    if (this.profileForm.valid){ //si el form es válido
      
      this.updateCliente(); // el cliente global se acutliza con los variables de form0

      //Separamos la información para mandarla al backend

      const cliente = {
        bio: this.cliente.bio,
        nacimiento: this.cliente.nacimiento,
        nombre: this.cliente.nombre,
      }
      const usuario = {
        email: this.cliente.usuario.email,
        password: this.cliente.usuario.password
      }
      //hacemos el post
      this.usuarioService.crearUsuarioYCliente(usuario, cliente).subscribe(
        response =>{
          console.log(response);

            if (this.nuevoTelefono != ""){ //si hay un telefono inicial, se crea
              this.telefonoService.addTelefono(this.nuevoTelefono, response.cliente.id).subscribe(
                responseTlf =>{
                  console.log("tlf nuevo:" + responseTlf.numero);
                });
             }

             this.loginUser();

             this.messageService.add({
              severity: 'success',
              summary: 'Operación exitosa',
              detail: 'El usuario ha sido creado  correctamente.',
             
            }); 
            


           }, (error) => { //usuario no ha sido  creado
          console.log(error);
          if (error.status === 400){
            this.messageService.add({
              severity: 'error',
              summary: 'Operación fallada',
              detail: 'El usuario ya existe, prueba otro correo.',
              key: 'data',
          });
          }else{
            this.messageService.add({
              severity: 'error',
              summary: 'Operación fallada',
              detail: 'El usuario no ha sido creado.',
              key: 'data',
          });
          }

        } 
      );

     }else{ //Form no valido
        this.sendError();
     }

    }
    
  
    editarUsuario(){
      if (this.profileForm.valid ){
        
      this.updateCliente();
      console.log(this.cliente);

       const usuario = {
        id: this.cliente.usuario.id,
        email: this.cliente.usuario.email,
        password: this.cliente.usuario.password
      }

      const cliente = {
        id: this.clienteId,
        usuario: usuario,
        bio: this.cliente.bio,
        nacimiento: this.cliente.nacimiento,
        nombre: this.cliente.nombre,
        
      }
      

        this.clienteService.editCliente(cliente).subscribe(
          response =>{
           console.log(response);
           
           this.messageService.add({
            severity: 'success',
            summary: 'Operación exitosa',
            detail: 'El usuario ha sido editado  correctamente.',
           
          });
          //cerrar pop up
          this.cerrarDialog.emit();
        }, (error) => {
          console.log(error);
          this.messageService.add({
            severity: 'error',
            summary: 'Operación fallada',
            detail: 'El usuario no ha sido editado.',
            key: 'data',
        });
        
    });
  } else {
    this.sendError();
  }
}
    

loginUser() { 
  this.tokenService.verificarUsuario(this.cliente.usuario.email, this.cliente.usuario.password).subscribe(
    response => {

      if (response) { 
        console.log(response.message, response.token);
        //CREAR LOG DE INICIO DE SESION falta completar
        this.tokenService.setToken(response.token);
        this.messageService.add({severity:'success', summary: 'Login', detail: 'Login exitoso'});
        //cambiar a vista  
        this.tokenService.decodeToken().subscribe(
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

  goToLogin(){
    this.state.set('login');
  }

  private  getErrorMessages(controlName: string): string[] {
    const control = this.profileForm.get(controlName);

    if (controlName === 'password2') {
      controlName = 'password repetida';
    }
    
    if (control?.hasError('notEqual')) {
      return ['Las contraseñas no coinciden.'];
    }

    if (control?.hasError('required')) {
      return [controlName + ' es obligatorio.'];
    }
  
    if (control?.hasError('pattern')) {
      return ['El formato  de ' + controlName + ' no es válido.'];
    }
  
    if (control?.hasError('minlength')) {
      return [`Debe tener al menos ${control.getError('minlength').requiredLength} caracteres.`];
      
    }
  
    
    return [];
  }
  
  
  sendError() {
    const errorMessages: string[] = [];
  
    Object.keys(this.profileForm.controls).forEach((key) => {
      const messages = this.getErrorMessages(key);
      errorMessages.push(...messages);
    });
  
    // Log, mostrar o manejar los mensajes de error según tus necesidades.
    console.log(errorMessages);
  
    // Aquí puedes usar los mensajes para mostrarlos en la interfaz de usuario, por ejemplo, usando un servicio de mensajes.
  
    // Ejemplo de uso con MessageService:
    errorMessages.forEach((message) => {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: message,
        key: 'data',
      });
    });
  }
}
  
  
  
  



