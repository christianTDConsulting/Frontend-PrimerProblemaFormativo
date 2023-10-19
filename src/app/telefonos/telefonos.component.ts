import { Component, OnInit } from '@angular/core';

import { TelefonoService } from './telefono.service';
import { Telefono } from './telefono';
import { Cliente } from '../clientes/cliente';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-telefonos',
  templateUrl: './telefonos.component.html',
  styleUrls: ['./telefonos.component.scss']
})
export class TelefonosComponent {

  telefonos: Telefono[] = [];
  cliente: Cliente = {
    id: 0, // Valor inicial para 'id'
    nombre: '', // Valor inicial para 'nombre'
    email: '',
    bio: '',
    nacimiento: new Date()
  };
  nuevoTelefono="";

  constructor(
   
    private telefonoService: TelefonoService,
    public dialogConfig : DynamicDialogConfig,
    public messageService : MessageService,
  ) {}

  ngOnInit(): void {
    const clienteId = this.getParam();
    if (clienteId !== null) {
      this.getCliente(clienteId);
      this.getTelefonosList(clienteId);
    }
    
  }
  private getParam(){
   // return this.activatedRoute.snapshot.paramMap.get('clienteId');
   return this.dialogConfig.data.id;
  }

  getTelefonosList(id: string) {
    this.telefonoService.getTelefonosCliente(id).subscribe(
      (response: Telefono[]) => {
        console.log(response);
        this.telefonos = response;
      },
      (error) => {
        // Manejo de errores
        console.error('Error al obtener la lista de teléfonos:', error);
      }
    );
  }

  getCliente(id: string) {
    this.telefonoService.getCliente(id).subscribe(
      (response: Cliente) => {
        this.cliente = response;
        console.log(response);
      },
      (error) => {
        // Manejo de errores
        console.error('Error al obtener el cliente:', error);
      }
    );
  }

  borrarTelefono(numero: string){
    this.telefonoService.deleteTelefono(numero).subscribe(
      response => {
        console.log(response);

          //refresh
        const ClienteId = this.getParam()
        if  (ClienteId !== null){
          this.getTelefonosList(ClienteId);
        }

        this.messageService.add({
          severity: 'success',
          summary: 'Operación exitosa',
          detail: 'El telefono ha sido borrado correctamente.',
          key:'tlf',
      });
       
      }, (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Operación fallada',
          detail: 'El teléfono no ha sido borrado.' ,
          key:'tlf',
      });
      }
     
       
    )
   
  }
  crearTelefono( ){
    if (this.nuevoTelefono !== '' && this.cliente.id !== undefined){
      
      console.log(this.nuevoTelefono);
      this.telefonoService.addTelefono(this.nuevoTelefono,this.cliente.id).subscribe(
        response =>{
          console.log(response);
            //refresh
        const ClienteId = this.getParam();
        if  (ClienteId !== null){
          this.getTelefonosList(ClienteId);
          this.messageService.add({
            severity: 'success',
            summary: 'Operación exitosa',
            detail: 'El número de telefono ha sido creado  correctamente.',
            key:'tlf',
        });
        }
        }, (error) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Operación fallada',
            detail: 'El teléfono no ha sido creado.' ,
            key:'tlf',
        });
        }
      )
    }else{
      this.messageService.add({
        severity: 'info',
        summary: 'Atención',
        detail: 'Escriba un número de telefono para añadirlo.',
        key:'tlf',
    });
    }
   
   }
  
}
