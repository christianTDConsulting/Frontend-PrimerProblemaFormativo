import { Component, OnInit, Input, } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Cliente } from '../../models/cliente';
import { ClienteService } from '../../services/cliente/cliente.service';
import { MessageService } from 'primeng/api';
import {TelefonoService} from '../../services/telefono/telefono.service';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';

@Component({
  selector: 'app-usuarioForm',
  templateUrl: './usuarioForm.component.html',
  styleUrls: ['./usuarioForm.component.css']
})
export class UsuarioFormComponent implements OnInit {
  @Input() clienteId: any; // si me pasan un clienteId tengo token
  @Input () state:any  // si me pasan el estado, no tengo token
  //@Output() guardar = new EventEmitter<Cliente>();

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

  
  
  profileForm: FormGroup = new FormGroup({
    nombre: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    //email: new FormControl('', [Validators.required, Validators.email]),
    email : new FormControl('', [Validators.required, Validators.pattern("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$")]),
    bio: new FormControl('',[ Validators.maxLength(200)] ),
    nacimiento: new FormControl(new Date("2000-01-01T00:00:00Z"), Validators.required),
    telefono: new FormControl('',[ Validators.pattern("^[0-9]{3}-[0-9]{3}-[0-9]{3}$")] ),
    password: new FormControl('', [
      Validators.required,
      //Validators.minLength(8),   longitud mínima
     // Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&!])[A-Za-z\d@#$%^&!]*$/), // Exige diversidad de caracteres
      //Validators.pattern(/^(?![\d]+$)(?![a-zA-Z]+$)(?![^a-zA-Z\d]+$).{8,}$/) // Evita palabras comunes y datos personales
    ]),
   
    password2: new FormControl('', [Validators.required]), // hacer que este campo sea igual
  
  })
 


  constructor(
   
    private clienteService: ClienteService,
    private usuarioService: UsuarioService,
    public messageService : MessageService,
    public telefonoService: TelefonoService,
  
   
  ) { }

  
  ngOnInit(): void {
  
    
    if (this.clienteId !== undefined) {
      
      console.log("edit");
      this.initParams(this.clienteId);
      
    
    }else{
      console.log("create");
    }
   

  }
  //PRIVADOS

   passwordMatchValidator(form: FormGroup) {
    const password1 = form.get('password1')?.value;
    const password2 = form.get('password2')?.value;
  
    if (password1 !== password2) {
      return { passwordMismatch: true };
    }
  
    return null;
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



      private updateCliente(){
       
        const { telefono, nacimiento, ...clienteWithoutTelefonoNacimiento } = this.profileForm.value;
        this.cliente = clienteWithoutTelefonoNacimiento;
        this.nuevoTelefono = telefono;
        this.cliente.nacimiento = this.dateIsUTC(nacimiento);
        this.cliente.id = this.clienteId;
        
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
    if (this.profileForm.valid){
      
      this.updateCliente();

      console.log(this.cliente.nacimiento);
      const cliente = {
        bio: this.cliente.bio,
        nacimiento: this.cliente.nacimiento,
        nombre: this.cliente.nombre,
      }
      const usuario = {
        email: this.cliente.usuario.email,
        password: this.cliente.usuario.password
      }
      this.usuarioService.crearUsuarioYCliente(usuario, cliente).subscribe(
        response =>{
          console.log(response);
          if (this.nuevoTelefono != ""){
            this.telefonoService.addTelefono(this.nuevoTelefono, response.id).subscribe(
              responseTlf =>{
                console.log("tlf nuevo:" + responseTlf.numero);
              }
            )
           }
           this.messageService.add({
            severity: 'success',
            summary: 'Operación exitosa',
            detail: 'El usuario ha sido creado  correctamente.',
           
        }) }, (error) => {
          console.log(error);
          this.messageService.add({
            severity: 'error',
            summary: 'Operación fallada',
            detail: 'El usuario no ha sido creado.',
            key: 'data',
        });
        } 
      );

     }else{
        this.messageService.add({
          severity: 'info',
          summary: 'Atención',
          detail: 'Asegurese de que los datos son correctos.',
          key: 'data',
      });
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
           //cerrar pop up
           this.messageService.add({
            severity: 'success',
            summary: 'Operación exitosa',
            detail: 'El usuario ha sido editado  correctamente.',
            key: 'data',
          });
        }, (error) => {
          console.log(error);
          this.messageService.add({
            severity: 'error',
            summary: 'Operación fallada',
            detail: 'El usuario no ha sido editado.',
            key: 'data',
        });
        
    });
  }
}

    goToLogin(){
      this.state.set('login');
    }


}
