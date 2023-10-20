import { Component, OnInit } from '@angular/core';

import { TelefonoService } from './telefono.service';
import { Telefono } from './telefono';
import { Cliente } from '../clientes/cliente';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';
import { FormControl, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';

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

  editTelefono = "";
  edit = false; // toast

  formTlf = new FormGroup({
    telefono: new FormControl('', [Validators.required, Validators.pattern("^[0-9]{9}$")] )
  })


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
        this.edit = false;
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

        if (!this.edit){
          this.messageService.add({
            severity: 'success',
            summary: 'Operación exitosa',
            detail: 'El telefono ha sido borrado correctamente.',
            key:'tlf',
        });
        }
         
        
        
       
      }, (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Operación fallada',
          detail: 'El teléfono no ha sido borrado.' ,
          key:'tlf',
      });
      console.log(error);
      }
     
       
    )
   
  }
  crearTelefono( ){
    if (this.formTlf.valid && this.cliente.id !== undefined){
      const nuevoTelefono = this.formTlf.value.telefono as string
      console.log(nuevoTelefono);

      this.telefonoService.addTelefono(nuevoTelefono,this.cliente.id).subscribe(
        response =>{
          console.log(response);
            //refresh
        const ClienteId = this.getParam();
        if  (ClienteId !== null && !this.edit ){
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
        detail: 'Escriba un número de teléfono válido: 9 dígitos sin espacios.', 
        key:'tlf',
    });
    }
   
   }
   private isValidTelephone(numero: string): boolean {
    return /^[0-9]{9}$/.test(numero);
   }
   updateEditTelefono(numero:string){
    this.editTelefono = numero;
    console.log(this.editTelefono);
   }

   //El telefono es mi id de la tabla, por lo tanto no se puede editar, se puede borrar y crear uno nuevo con el mismo id asociado
   editarTelefono(telefono: Telefono){
    if (this.isValidTelephone(telefono.numero)){

      this.edit = true;
            
      this.borrarTelefono(this.editTelefono); 
      
      this.formTlf.patchValue({
        telefono: telefono.numero,
      })
      this.crearTelefono();
      
   
      
      this.messageService.add({
        severity: 'success',
        summary: 'Operación exitosa',
        detail: 'teléfono  modificiado',
        key:'tlf',
    });

     }else{
       this.messageService.add({
         severity: 'info',
         summary: 'Atención',
         detail: 'teléfono no modificiado: Asegurese de que el telefono es válido.',
         key:'tlf',
     });
  }
   }

  
}
