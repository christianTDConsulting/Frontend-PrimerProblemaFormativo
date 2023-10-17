import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cliente } from './cliente';

@Injectable({
  providedIn: 'root'
})

export class ClienteService {

  url: string = 'http://localhost:3000/clientes/';
  constructor(private http: HttpClient) { }


  getClientes(): Observable<Cliente[]>{
    return this.http.get<Cliente[]>(this.url);
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


    return this.http.delete<any>(this.url,options);
  }
  addCliente(nombre:string){
    const body = { nombre: nombre };

    // Define las cabeceras de la solicitud, si es necesario
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
  
    const options = { 
      headers: headers, 
    };
    //especificar tipo de datos
    console.log(this.url);
    return this.http.post<any>(this.url, body, options);
  }

  editCliente(id:string, nombre:string){
    const body = { id: id, nombre: nombre };

    // Define las cabeceras de la solicitud, si es necesario
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
  
    const options = { headers: headers };
      //especificar tipo de datos
    return this.http.put<any>(this.url, body, options);
  }
  getCliente(id:String): Observable<Cliente>{
    return this.http.get<Cliente>(this.url + id);
  }
}
