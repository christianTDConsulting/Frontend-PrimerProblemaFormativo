import { Component } from '@angular/core';
import { ClienteService } from '../clientes/cliente.service';
import { Telefono } from '../telefonos/telefono';
import { Cliente } from '../clientes/cliente';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-data-cliente',
  templateUrl: './data-cliente.component.html',
  styleUrls: ['./data-cliente.component.scss']
})
export class DataClienteComponent {
  cliente : Cliente = {
    nombre: "",
    email:"",
    bio:"",
    nacimiento: new Date(),
  }
 
  crear:boolean = true;
  

  constructor(
   
    private clienteService: ClienteService,
    public dialogConfig : DynamicDialogConfig,
    public messageService : MessageService,
  ) {}
  ngOnInit(): void {
    const clienteId = this.getParam();
    if (clienteId !== undefined) {
      this.crear = false;
      console.log("edit")
      this.initParams(clienteId);
    }else{
      console.log("create")
    }
   
  }
  private validarDatos(){
    return (this.cliente.nombre != '' && this.cliente.email != '');  
  }
  private getParam(){
    return this.dialogConfig.data.id;
  }
  initParams(id:string){
    this.clienteService.getCliente(id).subscribe(
      response => {
       this.cliente = response;
      });
  }
  crearUsuario(){
    if (this.validarDatos()){
     

      this.clienteService.addCliente(this.cliente).subscribe(
        response =>{
          console.log(response);
          
          this.messageService.add({
              severity: 'success',
              summary: 'Operación exitosa',
              detail: 'El usuario ha sido creado  correctamente.'
          });

          //this.dialogConfig.close();
        }, (error) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Operación fallada',
            detail: 'El usuario no ha sido creado.'
        });
        }
      )
     } else{
      this.messageService.add({
        severity: 'info',
        summary: 'Atención',
        detail: 'Asegurese de rellenar el nombre y el email para añadir un usuario.'
    });
     }
    }

    editarUsuario(){
      if (this.validarDatos() ){
            
        this.clienteService.editCliente(this.cliente).subscribe(
          response =>{
            console.log(response);
        
            
            //this.dialogConfig.close();
  
            this.messageService.add({
              severity: 'success',
              summary: 'Operación exitosa',
              detail: 'El nombde de cliente ha sido editado  correctamente.'
          });
          }, (error) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Operación fallada',
              detail: 'El nombre de cliente no ha sido editado.'
          });
          }
        )
       }
    }

     
}
