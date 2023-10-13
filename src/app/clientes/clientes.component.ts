import { Component } from '@angular/core';
import { ClienteService } from './cliente.service';
import { Router } from '@angular/router';
import { Cliente } from './cliente';



@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.scss']
})
export class ClientesComponent {

  clientes: Cliente[] = [];
  constructor(private router: Router, private clienteService: ClienteService){}
  nuevoNombre = 'John doe';
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
      }
    )
    //refresh
  }
 crearUsuario(nombre:string){
  console.log(nombre)
  this.clienteService.addCliente(nombre).subscribe(
    response =>{
      console.log(response);
    }
  )
 }
}
