import { Component } from '@angular/core';
import { ClienteService } from '../clientes/cliente.service';
import { TelefonoService } from '../telefonos/telefono.service';
import { Cliente } from '../clientes/cliente';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import {DynamicDialogRef} from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';
import { FormControl, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';


@Component({
  selector: 'app-data-cliente',
  templateUrl: './data-cliente.component.html',
  styleUrls: ['./data-cliente.component.scss']
})
export class DataClienteComponent {
 
  cliente: Cliente = {
    id:undefined,
    nombre: '',
    email: '',
    bio: '',
    nacimiento: new Date(),
  };
  nuevoTelefono="";
 
  crear:boolean = true;
  
  profileForm: FormGroup = new FormGroup({
    nombre: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    //email : new FormControl('', [Validators.required, Validators.pattern("^[^\s@]+@[^\s@]+\.[^\s@]+$")]),
    bio: new FormControl('',[ Validators.maxLength(200)] ),
    nacimiento: new FormControl(new Date("2000-01-01T00:00:00Z"), Validators.required),
    telefono: new FormControl('',[ Validators.pattern("^[0-9]{9}$")] )
  
  })
 


  constructor(
   
    private clienteService: ClienteService,
    public dialogConfig : DynamicDialogConfig,
    public messageService : MessageService,
    public telefonoService: TelefonoService,
    private ref: DynamicDialogRef,
   
  ) { }

  
  ngOnInit(): void {
    const clienteId = this.getParam();
    if (clienteId !== undefined) {
      this.crear = false;
      console.log("edit");
      this.initParams(clienteId);
      
    
    }else{
      console.log("create")
    }
   
  }
  //PRIVADOS

  private getParam(){
    return this.dialogConfig.data.id;
  }
   //Tue Jan 11 2000 00:00:00 GMT+0100 
   //"2000-01-01T00:00:00Z"

  private dateIsUTC (fecha:Date) {
    // Verifica si la fecha tiene una zona horaria GMT
    if (fecha.toTimeString().includes('Z')) {
      // La fecha ya tiene una zona horaria GMT, no es necesario hacer nada
      return fecha;
    } else {
      

      fecha.setHours(fecha.getHours() + 2);
      
      return fecha;
    
    
    }
  }



      private updateCliente(){
       
        const { telefono, nacimiento, ...clienteWithoutTelefonoNacimiento } = this.profileForm.value;
        this.cliente = clienteWithoutTelefonoNacimiento;
        this.nuevoTelefono = telefono;
        this.cliente.nacimiento = this.dateIsUTC(nacimiento);
        if (!this.crear ){
          this.cliente.id = this.getParam();
        }
        
      }

  //METODOS
  initParams(id:string){
    this.clienteService.getCliente(id).subscribe(
      response => {

       this.cliente = response;
       console.log("tiempo obtenido: " + response.nacimiento);
       

       this.profileForm.patchValue({
        nombre: this.cliente.nombre,
        email: this.cliente.email,
        bio: this.cliente.bio,
        nacimiento: new Date(this.cliente.nacimiento),
      });

      });
  }

  crearUsuario(){
    if (this.profileForm.valid){
      
      this.updateCliente();

      console.log(this.cliente.nacimiento);
      this.clienteService.addCliente(this.cliente).subscribe(
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
             
          });
          
     
          
          this.ref.close(); //close pop up
        }, (error) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Operación fallada',
            detail: 'El usuario no ha sido creado.',
            key: 'data',
        });
        }
      )
     } else{
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

        this.clienteService.editCliente(this.cliente).subscribe(
          response =>{
            console.log(response);  
            this.messageService.add({
              severity: 'success',
              summary: 'Operación exitosa',
              detail: 'El cliente ha sido editado  correctamente.',
           
          });
          this.ref.close(); //close pop up
          }, (error) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Operación fallada',
              detail: 'El cliente no ha sido editado.',
              key: 'data',
          });
          }
        )
       }else{
        this.messageService.add({
          severity: 'info',
          summary: 'Atención',
          detail: 'Asegurese de que los datos son correctos.',
          key: 'data',
      });
       }
    }

     
}
