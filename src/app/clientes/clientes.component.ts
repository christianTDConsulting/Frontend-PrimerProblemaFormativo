import { Component, OnDestroy } from '@angular/core';
import { ClienteService } from './cliente.service';
import { Router } from '@angular/router';
import { Cliente } from './cliente';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';
import { TelefonosComponent } from '../telefonos/telefonos.component';
import { DataClienteComponent } from '../data-cliente/data-cliente.component';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.scss'],
  providers: [DialogService, MessageService]
})
export class ClientesComponent {

  clientes: Cliente[] = [];
  ref : DynamicDialogRef | undefined;
  displayDialog: boolean = false;

  

  constructor(
    private clienteService: ClienteService,
    public dialogService: DialogService,  
    public messageService : MessageService,
  
  ){}

  ngOnInit(): void {
    this.getClientesList();
  }

  getClientesList() {
    this.clienteService.getClientes().subscribe(
      response => {
        console.log(response);
        this.clientes = response;
      } //control de error
    )
  }

  borrarUsuario(id:string){
    this.clienteService.deleteCliente(id).subscribe(
      response => {
        console.log(response);
        //refresh
        this.getClientesList();
        this.messageService.add({
          severity: 'success',
          summary: 'Operación exitosa',
          detail: 'El usuario ha sido borrado correctamente.'
      });
      }, (error) => {
        console.log(error);
        this.messageService.add({
          severity: 'error',
          summary: 'Operación fallada',
          detail: 'El usuario no ha sido borrado.'
      });
      }
    )
    
  }
 
  editarNombre(cliente:Cliente){
    if (cliente.nombre != ''){
      console.log(cliente.nombre)
      this.clienteService.editCliente(cliente).subscribe(
        response =>{
          console.log(response);
          //refresh
          this.getClientesList();

          this.messageService.add({
            severity: 'success',
            summary: 'Operación exitosa',
            detail: 'El nombre de cliente ha sido editado  correctamente.'
        });
        }, (error) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Operación fallada',
            detail: 'El nombre de cliente no ha sido editado.'
        })
          console.log(error);
        }
      )
     }
  }

  private isValidEmail(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }
  editarEmail(cliente:Cliente){
    if (this.isValidEmail(cliente.email)){
      console.log(cliente.email)
      this.clienteService.editCliente(cliente).subscribe(
        response =>{
          console.log(response);
          //refresh
          this.getClientesList();

          this.messageService.add({
            severity: 'success',
            summary: 'Operación exitosa',
            detail: 'El email ha sido editado  correctamente.'
        });
        }, (error) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Operación fallada',
            detail: 'El email no ha sido editado.'
        });
          console.log(error);
        }
      )
     }else{
       this.messageService.add({
         severity: 'info',
         summary: 'Atención',
         detail: 'Email no modificiado: Asegurese de que el correo es válido.',
         
     });
  }
}

 
  

  show(id:string){
    this.clienteService.getCliente(id).subscribe(
      (cliente: Cliente) => {
        this.ref = this.dialogService.open(TelefonosComponent, {
          header: 'Teléfonos de ' + cliente.nombre,
          data: {
            id: id
          },
          contentStyle: { overflow: 'auto' },
          baseZIndex: 10000,
          maximizable: true
        });
        this.ref.onMaximize.subscribe((value) => {
          this.messageService.add({ severity: 'info', summary: 'Pantalla completa' });
      });
      
      });


  }
  ngOnDestroy() {
    if (this.ref) {
        this.ref.close();

    }
}

showCreation(){

  this.ref = this.dialogService.open(DataClienteComponent, {
        header: 'Crear nuevo cliente',
        data: {
          
        },
        contentStyle: { overflow: 'auto' },
        baseZIndex: 10000,
        maximizable: true
  });

  this.ref.onMaximize.subscribe((value) => {
      this.messageService.add({ severity: 'info', summary: 'Pantalla completa' });
  });

  //refresh
  this.ref.onClose.subscribe(() => {
    this.getClientesList();
  });  
}
showEdition(id:string){
  this.clienteService.getCliente(id).subscribe(
    (cliente: Cliente) => {
      this.ref = this.dialogService.open(DataClienteComponent, {
        header: 'Datos de  ' + cliente.nombre,
        data: {
          id: id
        },
        contentStyle: { overflow: 'auto' },
        baseZIndex: 10000,
        maximizable: true
      });

    this.ref.onMaximize.subscribe((value) => {
      this.messageService.add({ severity: 'info', summary: 'Pantalla completa' });
    });
    
    this.ref.onClose.subscribe(() => {
      this.getClientesList();
    });
  });



}


}
