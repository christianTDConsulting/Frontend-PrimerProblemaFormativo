import { Component ,  Input} from '@angular/core';
import { TelefonoService } from '../services/telefono/telefono.service';

import { Telefono } from '../models/telefono';
import { Cliente } from '../models/cliente';
import { MessageService, ConfirmationService } from 'primeng/api';
import { FormControl, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Table } from 'primeng/table';
import { ClienteService } from '../services/cliente/cliente.service';
import { LoginService } from '../services/login/login.service';


@Component({
  selector: 'app-telefonos',
  templateUrl: './telefonos.component.html',
  styleUrls: ['./telefonos.component.scss']
})

export class TelefonosComponent {
  //////////////////////////////////////////////////////////////
  //------------------CONSTANTES GLOBALES---------------------//
  //////////////////////////////////////////////////////////////

  @Input() clienteId: any; //si viene de la vista adminView, en caso de venir de cliente se obtiene del token


  telefonos: Telefono[] = [];
  private destroy$: Subject<void> = new Subject<void>();

 

  cliente: Cliente = {
    id: 0,
    nombre: '',
    usuario: {
      id: 0,
      email: '',
      password: '',
      id_perfil: 1,
    },
    bio: '',
    nacimiento: new Date()
  };

  // Validator tld
  formTlf = new FormGroup({
    telefono: new FormControl('', [Validators.required, Validators.pattern("^[0-9]{3}-[0-9]{3}-[0-9]{3}$")])
  });

actions: any[] = []; //speedDial
 inputTextBool: boolean [] = [];
 //dropdown
 itemsDropdown = [
  { label: 'Telefonos', value: 'Telefonos' },
  { label: 'Eliminados', value: 'Eliminados' }
];

 selectedList : 'Telefonos' | 'Eliminados' = 'Telefonos';
 
selectedTLF: Telefono[] = [];


  //////////////////////////////////////////////////////////////
  //------------------CONSTRUCTOR-----------------------------//
  //////////////////////////////////////////////////////////////
  constructor(
    private telefonoService: TelefonoService,
    public messageService: MessageService,
    public confirmationService : ConfirmationService,
    private clienteService: ClienteService,
    public loginService: LoginService
  ) {}

  ngOnInit(): void {
    //check token
    //init params
    if (this.clienteId == undefined) {
      this.getParam();
    } else{
      this.getCliente();
      this.getTelefonosList();
    }
   
  }

 

  getParam() {
    this.loginService.decodeToken().subscribe(
      (response: any) => {
        this.clienteId = response.id;
        this.getCliente();
        this.getTelefonosList()
      });
  }
 
  
  
 
  //////////////////////////////////////////////////////////////
  //------------------MÉTODOS TELEFONO------------------------//
  //////////////////////////////////////////////////////////////

  //Limpia los filtros
  clear(table: Table) {
    this.selectedTLF = [];
    table.clear();
}




//obtiene el id del cliente pasado en el dialog
 
  
  //Lista de todos los telefonos visibles
  getTelefonosList() {
    this.telefonoService.getTelefonosClienteVisible(this.clienteId,true).pipe(takeUntil(this.destroy$)).subscribe(
      (response: Telefono[]) => {
        console.log(response);
        this.telefonos = response;
      },
      (error) => {
        console.error('Error al obtener la lista de teléfonos:', error);
      }
    );
  }
    //Lista de todos los telefonos eliminados
  getTelefonosEliminadosList() {
    this.telefonoService.getTelefonosClienteVisible(this.clienteId,false).pipe(takeUntil(this.destroy$)).subscribe(
      (response: Telefono[]) => {
        console.log(response);
        this.telefonos = response;
      },
      (error) => {
        console.error('Error al obtener la lista de teléfonos:', error);
      }
    );
  }

  //obtener el cliente
  getCliente() {
    this.clienteService.getCliente(this.clienteId).subscribe(
      (response: Cliente) => {
        this.cliente = response;
        console.log(response);
      },
      (error) => {
        console.error('Error al obtener el cliente:', error);
      }
    );
  }

/*
  borrarTelefono(id: number) {
    this.telefonoService.deleteTelefono(id).pipe(takeUntil(this.destroy$)).subscribe(
      response => {
        console.log(response);
        const ClienteId = this.getParam()
        if (ClienteId !== null) {
          this.getTelefonosList(ClienteId);
        }

        this.messageService.add({
          severity: 'success',
          summary: 'Operación exitosa',
          detail: 'El telefono ha sido borrado correctamente.',
          key: 'tlf',
        });
      },
      (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Operación fallada',
          detail: 'El teléfono no ha sido borrado.',
          key: 'tlf',
        });
        console.log(error);
      }
    );
  }
  */
 //cambiar la visibilidad del telefono
  toggleVisibleTelefono(id: number) {
    this.telefonoService.toggleVisibiltyTelefono(id).pipe(takeUntil(this.destroy$)).subscribe(
      response => {
        console.log(response);

  
        this.selectedTLF = [];
        
        if (this.selectedList === 'Telefonos'){
          this.getTelefonosList(); //refresh
          this.messageService.add({
            severity: 'success',
            summary: 'Operación exitosa',
            detail: 'El telefono ha sido borrado correctamente.',
            key: 'tlf',
          });
          this.confirmationService.close();
        } else{
          this.getTelefonosEliminadosList(); //refresh
          this.messageService.add({
            severity: 'success',
            summary: 'Operación exitosa',
            detail: 'El telefono ha sido recuperado correctamente.',
            key: 'tlf',
          });
          this.confirmationService.close();
        }

       
      },
      (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Operación fallada',
          detail: 'El teléfono no ha sido borrado/recuperado.',
          key: 'tlf',
        });
        console.log(error);
      }
    );
  }
  //cambiar la visibilidad de varios telefonos seleccionados
  toggleVisibleSelectedTelefonos() {
    this.selectedTLF.map(telefono => {
      this.toggleVisibleTelefono(telefono.id);
    })
  }

  //Cambiar visibilidad de varios telefonos con confirmationService
  deleteSelectedTelefonos() {
   
      
      this.confirmationService.confirm({
        message: '¿Estás seguro que quieres eliminar los telefonos?',
        header: 'Confirmación',
        icon: 'pi pi-exclamation-triangle',
        accept: () => this.toggleVisibleSelectedTelefonos(),
        reject: () =>  {
          this.messageService.add({
            severity: 'info',
            summary: 'Atención',
            detail: 'Telefono no borrado.',
            key: 'tlf',
          });
          this.confirmationService.close();
      }
      });
   
    
  }
  
  crearTelefono() {
    if (this.formTlf.valid && this.cliente.id !== undefined) {
      const nuevoTelefono = this.formTlf.value.telefono as string;
      console.log(nuevoTelefono);
    

      this.telefonoService.addTelefono(nuevoTelefono, this.cliente.id).pipe(takeUntil(this.destroy$)).subscribe(
        response => {
          console.log(response);
          const ClienteId = this.getParam();
          if (ClienteId !== null) {
            this.getTelefonosList();
            this.messageService.add({
              severity: 'success',
              summary: 'Operación exitosa',
              detail: 'El número de telefono ha sido creado correctamente.',
              key: 'tlf',
            });
          }
        },
        (error) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Operación fallada',
            detail: 'El teléfono no ha sido creado.',
            key: 'tlf',
          });
          console.log(error);
        }
      );
    } else {
      console.log(this.formTlf.value);
      this.messageService.add({
        severity: 'info',
        summary: 'Atención',
        detail: 'Asegúrese de que el teléfono introducido es válido.',
        key: 'tlf',
      });
    }
  }

  isValidTelephone(numero: string): boolean {
    return /^[0-9]{3}-[0-9]{3}-[0-9]{3}$/.test(numero);
  }

  editarTelefono(telefono: Telefono, index:number) {
    if (this.isValidTelephone(telefono.numero)) {
      this.telefonoService.editTelefono(telefono).pipe(takeUntil(this.destroy$)).subscribe(
        response => {
          console.log(response);
          this.messageService.add({
            severity: 'success',
            summary: 'Operación exitosa',
            detail: 'Teléfono editado correctamente.',
            key: 'tlf',
          });
          
       
        },
        (error) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Operación fallada',
            detail: 'El teléfono no ha sido editado.',
            key: 'tlf',
          });
          console.log(error);
        });
    } else {


      this.messageService.add({
        severity: 'info',
        summary: 'Atención',
        detail: 'Teléfono no editado: Asegúrese de que el teléfono introducido es válido.',
        key: 'tlf',
      });
      
      this.getTelefonosList();
    }
    this.changeInputBool(index); //SpeedDial
  }

  //////////////////////////////////////////////////////////////
  //------------------SPEED DIAL y DROWDOWN.------------------//
  //////////////////////////////////////////////////////////////




//EDIT
changeInputBool(index:number) {

  this.inputTextBool[index] = !this.inputTextBool[index]; 
}

closeEdit(index:number){


  this.getTelefonosList();
  this.messageService.add({
    severity: 'info',
    summary: 'Atención',
    detail: 'Teléfono no editado',
    key: 'tlf',
  });
  this.changeInputBool(index);
}
//speed dial
createActions(telefonoId: number, index: number) {
  this.actions = [
    { 
      icon: 'pi pi-user-edit', 
      command: (event:any) => { 
        this.changeInputBool(index);
      } 
    }, 
    { 
      icon: 'pi pi-trash', 
      command: () => { 
        this.confirmationService.confirm({
          message: 'Estás seguro que quieres eliminar el telefono?',
          header: 'Confirmación',
          icon: 'pi pi-exclamation-triangle',
          accept: () => this.toggleVisibleTelefono(telefonoId),
          reject: () =>  {
            this.messageService.add({
              severity: 'info',
              summary: 'Atención',
              detail: 'Teléfono no borrado.',
              key: 'tlf',
            });
            this.confirmationService.close();
          }
        });
      } 
    }, 
    
  ];
}

onClickSpeedDial(telefonoId: number, index:number) {

  this.createActions(telefonoId, index);
}

//Dropdown
updateList(){
  this.selectedTLF = [];
  if (this.selectedList === 'Telefonos'){
    this.getTelefonosList();
  } else{
    this.getTelefonosEliminadosList();
  }
}
 

}
