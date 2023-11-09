import { Component } from '@angular/core';
import { ClienteService } from 'src/app/services/cliente/cliente.service';
import { Cliente } from 'src/app/models/cliente';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { MessageService, ConfirmationService } from 'primeng/api';
import { Table } from 'primeng/table';
import { TelefonoDialogComponent } from 'src/app/telefonos/telefonoDialog/telefonoDialog.component';
import { DataClienteComponent } from 'src/app/formDialog/data-cliente/data-cliente.component';


@Component({
  selector: 'app-viewAdmin',
  templateUrl: './viewAdmin.component.html',
  styleUrls: ['./viewAdmin.component.css']
})
export class ViewAdminComponent  {

 
  //////////////////////////////////////////////////////////////
  //------------------VARIABLES GLOBALES----------------------//
  //////////////////////////////////////////////////////////////
  clientes: Cliente[] = [];
  ref : DynamicDialogRef | undefined;
  displayDialog: boolean = false;
  selectClientes: Cliente[] = [];
  //eliminados:Boolean = false;
  actionsSpeedDial: any[] = []; // speed dial
  //Dropdown
  selectedList: 'Clientes' | 'Eliminados' = 'Clientes';
  itemsDropdown = [
    { label: 'Clientes', value: 'Clientes' },
    { label: 'Eliminados', value: 'Eliminados' }
  ];
  

  //////////////////////////////////////////////////////////////
  //------------------CONSTRUCTOR-----------------------------//
  //////////////////////////////////////////////////////////////
  constructor(
    private clienteService: ClienteService,
    public dialogService: DialogService,  
    public messageService : MessageService,
    public confirmationService : ConfirmationService
  
  ){}

  ngOnInit(): void {
    this.getClientesList();
  }

  //Inicializar lista de clientes

  //////////////////////////////////////////////////////////////
  //------------------MÉTOFOD CLIENTES------------------------//
  //////////////////////////////////////////////////////////////
  getClientesList() {
    this.clienteService.getClientesVisible(true).subscribe(response => {
      this.clientes = response; // Llama a la función asincrónica pasando el parámetro response
    });
  }
  getListEliminados(){
    this.clienteService.getClientesVisible(false).subscribe(
      response => {
        this.clientes = response;
        
      } //control de error
    )
  }
  


  //Clear filtros
  clear(table: Table) {
    this.selectClientes = [];
    table.clear();
}


  //borrar Cliente
  /*
  borrarUsuario(id:number){
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
    */

    toggleVisibleStateSelectedClientes() {
      this.selectClientes.map(cliente => {
        this.ToggleVisibleStateCliente(cliente.id!);
      })
    }
    deleteSelectedClientes() {
     
        
        this.confirmationService.confirm({
          message: '¿Estás seguro que quieres eliminar los clientes?',
          header: 'Confirmación',
          icon: 'pi pi-exclamation-triangle',
          accept: () => this.toggleVisibleStateSelectedClientes(),
          reject: () =>  {
            this.messageService.add({
              severity: 'info',
              summary: 'Atención',
              detail: 'Cliente no borrado.',
              key: 'tlf',
            });
            this.confirmationService.close();
        }
        });
     
      
    }
    
    
   ToggleVisibleStateCliente(id:number){
    this.clienteService.toggleVisibiltyCliente(id).subscribe(
      response => {
        console.log(response);
        this.selectClientes = [];
        //refresh
        if (this.selectedList==='Eliminados'){
          this.getListEliminados();
          this.messageService.add({
            severity: 'success',
            summary: 'Operación exitosa',
            detail: 'El usuario ha sido recuperado correctamente.'
        });
        }else{
          this.getClientesList();
          this.messageService.add({
            severity: 'success',
            summary: 'Operación exitosa',
            detail: 'El usuario ha sido borrado correctamente.'
        });
        }
       
      }, (error) => {
        console.log(error);
        this.messageService.add({
          severity: 'error',
          summary: 'Operación fallada',
          detail: 'El usuario no ha sido borrado/recuperado.'
      });
      }
    )
  }

  //editar nombre
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

  //comprobar que el correo es correcto
  private isValidEmail(email: string): boolean {
    return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
  }
  editarEmail(cliente:Cliente){

    if (this.isValidEmail(cliente.usuario?.email!)){
      console.log(cliente.usuario?.email!)
      this.clienteService.editCredentialsUsuario(cliente.usuario!).subscribe(
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

  //////////////////////////////////////////////////////////////
  //------------------DYNAMIC DIALOGS-------------------------//
  //////////////////////////////////////////////////////////////
 
  //abrir dynamic dialog de telefonos
  show(id:number){
    this.clienteService.getCliente(id).subscribe(
      (cliente: Cliente) => {
        this.ref = this.dialogService.open(TelefonoDialogComponent, {
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
      
      this.ref.onClose.subscribe(() => {
        this.getClientesList();
      });
      
      });


  }
  ngOnDestroy() {
    if (this.ref) {
        this.ref.close();

    }
}

//abrir dynamic dialog de Creacion
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

//abrir dynamic dialog de Edicion
showEdition(id:number){
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


  //////////////////////////////////////////////////////////////
  //------------------SPEED DIAL Y ELIMINADOS-----------------//
  //////////////////////////////////////////////////////////////





createActions(clientesId: number) {
  this.actionsSpeedDial = [
    { 
      icon: 'pi pi-user-edit', 
      command: () => { 
        this.showEdition(clientesId);
      },
    }, 
    { 
      icon: 'pi pi-phone', 
      command: () => { 
        this.show(clientesId);
      } 
    },
    { 
      icon: 'pi pi-trash', 
      command: () => { 
        
          this.confirmationService.confirm({
            message: '¿Estás seguro que quieres eliminar el cliente?',
            header: 'Confirmación',
            icon: 'pi pi-exclamation-triangle',
            accept: () => this.ToggleVisibleStateCliente(clientesId),
            reject: () =>  {
              this.messageService.add({
                severity: 'info',
                summary: 'Atención',
                detail: 'Cliente no borrado.',
                key: 'tlf',
              });
              this.confirmationService.close();
            }
          });
      } 
    }, 
   
  ];
}


onClickSpeedDial(clientesId: number) {
  this.createActions(clientesId);
}



updateList(){

  this.selectClientes = [];
  if(this.selectedList === 'Clientes'){
   
    this.getClientesList();
  }else {
   
    this.getListEliminados();
  }
}


}
