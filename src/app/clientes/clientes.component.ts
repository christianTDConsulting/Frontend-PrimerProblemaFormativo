import { Component, OnDestroy } from '@angular/core';
import { ClienteService } from './cliente.service';
import { Router } from '@angular/router';
import { Cliente } from './cliente';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';
import { TelefonosComponent } from '../telefonos/telefonos.component';


@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.scss'],
  providers: [DialogService, MessageService]
})
export class ClientesComponent {

  clientes: Cliente[] = [];
  nuevoNombre = '';
  filtro ='';
  ref : DynamicDialogRef | undefined;
  displayDialog: boolean = false;

  constructor(
    private router: Router,
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
        this.messageService.add({
          severity: 'error',
          summary: 'Operación fallada',
          detail: 'El usuario no ha sido borrado.'
      });
      }
    )
    
  }
 crearUsuario(){
  if (this.nuevoNombre != ''){
    console.log(this.nuevoNombre)
    this.clienteService.addCliente(this.nuevoNombre).subscribe(
      response =>{
        console.log(response);
        //refresh
        this.getClientesList();
        this.messageService.add({
            severity: 'success',
            summary: 'Operación exitosa',
            detail: 'El usuario ha sido creado  correctamente.'
        });
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
      detail: 'Escriba un nombre para añadir un usuario.'
  });
   }
  }
  editarClientes(id:string, nombre:string){
    if (nombre != ''){
      console.log(nombre)
      this.clienteService.editCliente(id, nombre).subscribe(
        response =>{
          console.log(response);
          //refresh
          this.getClientesList();

          this.messageService.add({
            severity: 'success',
            summary: 'Operación exitosa',
            detail: 'El usuario ha sido editado  correctamente.'
        });
        }, (error) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Operación fallada',
            detail: 'El usuario no ha sido editado.'
        });
        }
      )
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

}
