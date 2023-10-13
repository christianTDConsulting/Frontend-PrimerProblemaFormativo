import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TelefonoService } from './telefono.service';
import { Telefono } from './telefono';
import { Cliente } from '../clientes/cliente';

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
  nuevoTelefono="9999999999";

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private telefonoService: TelefonoService
  ) {}

  ngOnInit(): void {
    
    const clienteId = this.activatedRoute.snapshot.paramMap.get('clienteId');
    if (clienteId !== null) {
      this.getCliente(clienteId);
      this.getTelefonosList(clienteId);
    }
    
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
      }
    )
    //refresh
  }
  crearTelefono(numero:string, id:number ){
    console.log(numero)
    this.telefonoService.addTelefono(numero,id).subscribe(
      response =>{
        console.log(response);
      }
    )
   }
}
