import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cliente } from './cliente';

@Injectable({
  providedIn: 'root'
})

export class ClienteService {

  constructor(private http: HttpClient) { }


  getClientes(): Observable<Cliente[]>{
    return this.http.get<Cliente[]>('http://localhost:3000/clientes');
  }
  deleteCliente(id:string){
    const body = { id: id };

    // Define las cabeceras de la solicitud, si es necesario
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    const options = {
      headers: headers,
      body: body,
    };


    return this.http.delete<any>('http://localhost:3000/clientes/',options);
  }
  addCliente(nombre:string){
    const body = { nombre: nombre };

    // Define las cabeceras de la solicitud, si es necesario
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
  
    const options = { headers: headers };
    //especificar tipo de datos
    return this.http.post<any>('http://localhost:3000/clientes/', body, options);
  }

  editCliente(id:string, nombre:string){
    const body = { id: id, nombre: nombre };

    // Define las cabeceras de la solicitud, si es necesario
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
  
    const options = { headers: headers };
      //especificar tipo de datos
    return this.http.put<any>('http://localhost:3000/clientes/', body, options);
  }
  getCliente(id:String): Observable<Cliente>{
    return this.http.get<Cliente>('http://localhost:3000/clientes/' + id);
  }
}
