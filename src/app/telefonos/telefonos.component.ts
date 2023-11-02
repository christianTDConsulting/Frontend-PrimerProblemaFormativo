import { Component ,  ViewChild} from '@angular/core';
import { TelefonoService } from './telefono.service';
import { Telefono } from './telefono';
import { Cliente } from '../clientes/cliente';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { MessageService, ConfirmationService } from 'primeng/api';
import { FormControl, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';


@Component({
  selector: 'app-telefonos',
  templateUrl: './telefonos.component.html',
  styleUrls: ['./telefonos.component.scss']
})

export class TelefonosComponent {
  //////////////////////////////////////////////////////////////
  //------------------CONSTANTES GLOBALES---------------------//
  //////////////////////////////////////////////////////////////

  telefonos: Telefono[] = [];
  private destroy$: Subject<void> = new Subject<void>();
 
  cliente: Cliente = {
    id: 0,
    nombre: '',
    email: '',
    bio: '',
    nacimiento: new Date()
  };

  // Validator tld
  formTlf = new FormGroup({
    telefono: new FormControl('', [Validators.required, Validators.pattern("^[0-9]{9}$")])
  });
 


  //////////////////////////////////////////////////////////////
  //------------------CONSTRUCTOR-----------------------------//
  //////////////////////////////////////////////////////////////
  constructor(
    private telefonoService: TelefonoService,
    public dialogConfig: DynamicDialogConfig,
    public messageService: MessageService,
    public confirmationService : ConfirmationService
  ) {}
 

  //////////////////////////////////////////////////////////////
  //------------------MÉTODOS TELEFONO------------------------//
  //////////////////////////////////////////////////////////////
  ngOnInit(): void {
    const clienteId:number = this.getParam();
    if (clienteId !== null) {
      this.getCliente(clienteId);
      this.getTelefonosList(clienteId);

    }
  }

  private getParam() {
    return this.dialogConfig.data.id;
  }

  getTelefonosList(id: number) {
    this.telefonoService.getTelefonosClienteVisible(id,true).pipe(takeUntil(this.destroy$)).subscribe(
      (response: Telefono[]) => {
        console.log(response);
        this.telefonos = response;
      },
      (error) => {
        console.error('Error al obtener la lista de teléfonos:', error);
      }
    );
  }

  getCliente(id: number) {
    this.telefonoService.getCliente(id).subscribe(
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
  borrarTelefono(id: number) {
    this.telefonoService.toggleVisibiltyTelefono(id).pipe(takeUntil(this.destroy$)).subscribe(
      response => {
        console.log(response);

        const ClienteId = this.getParam();
        this.getTelefonosList(ClienteId);
        

        this.messageService.add({
          severity: 'success',
          summary: 'Operación exitosa',
          detail: 'El telefono ha sido borrado correctamente.',
          key: 'tlf',
        });
        this.confirmationService.close();
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

  crearTelefono() {
    if (this.formTlf.valid && this.cliente.id !== undefined) {
      const nuevoTelefono = this.formTlf.value.telefono as string;
      console.log(nuevoTelefono);
    

      this.telefonoService.addTelefono(nuevoTelefono, this.cliente.id).pipe(takeUntil(this.destroy$)).subscribe(
        response => {
          console.log(response);
          const ClienteId = this.getParam();
          if (ClienteId !== null) {
            this.getTelefonosList(ClienteId);
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
      this.messageService.add({
        severity: 'info',
        summary: 'Atención',
        detail: 'Escriba un número de teléfono válido: 9 dígitos sin espacios.',
        key: 'tlf',
      });
    }
  }

  isValidTelephone(numero: string): boolean {
    return /^[0-9]{9}$/.test(numero);
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
        detail: 'Teléfono no editado: Asegúrese de que el teléfono es válido.',
        key: 'tlf',
      });
      const ClienteId = this.getParam();
      this.getTelefonosList(ClienteId);
    }
    this.changeInputBool(index); //SpeedDial
  }

  //////////////////////////////////////////////////////////////
  //------------------SPEED DIAL-------------------------------//
  //////////////////////////////////////////////////////////////



actions: any[] = [];
inputTextBool: boolean [] = [];


changeInputBool(index:number) {

  this.inputTextBool[index] = !this.inputTextBool[index];
}

closeEdit(index:number){

  const ClienteId = this.getParam();
  this.getTelefonosList(ClienteId);
  this.messageService.add({
    severity: 'info',
    summary: 'Atención',
    detail: 'Teléfono no editado',
    key: 'tlf',
  });
  this.changeInputBool(index);
}

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
          message: '¿Estas seguro que quieres eliminar el telefono?',
          header: 'Confirmación',
          icon: 'pi pi-exclamation-triangle',
          accept: () => this.borrarTelefono(telefonoId),
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

 
}
