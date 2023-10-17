import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TelefonoService } from './telefono.service';
import { Telefono } from './telefono';
import { Cliente } from '../clientes/cliente';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-telefonos',
  templateUrl: './telefonos.component.html',
  styleUrls: ['./telefonos.component.scss']
})
export class TelefonosComponent {
  test = "testas";
  telefonos: Telefono[] = [];
  cliente: Cliente = {
    id: 0, // Valor inicial para 'id'
    nombre: '', // Valor inicial para 'nombre'
  };
  nuevoTelefono="";

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private telefonoService: TelefonoService,
    public dialogConfig : DynamicDialogConfig
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
        const ClienteId = this.activatedRoute.snapshot.paramMap.get('clienteId');
        if  (ClienteId !== null){
          this.getTelefonosList(ClienteId);
        }
       
      }
     
       
    )
   
  }
  crearTelefono( ){
    if (this.nuevoTelefono != ''){
      console.log(this.nuevoTelefono)
      this.telefonoService.addTelefono(this.nuevoTelefono,this.cliente.id).subscribe(
        response =>{
          console.log(response);
            //refresh
        const ClienteId = this.activatedRoute.snapshot.paramMap.get('clienteId');
        if  (ClienteId !== null){
          this.getTelefonosList(ClienteId);
          
        }
        }
      )
    }
   
   }
  
}
