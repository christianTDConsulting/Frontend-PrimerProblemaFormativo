import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Telefono } from './telefono';
import { Cliente } from '../clientes/cliente';


@Injectable({
  providedIn: 'root'
})
export class TelefonoService {

  url: string = 'http://localhost:3000/telefonos/';
  constructor(private http: HttpClient) { }

  getAllTelefonos(): Observable<Telefono[]>{

    return this.http.get<Telefono[]>(this.url);

  }
  getTelefonosCliente(idCliente:string): Observable<Telefono[]>{

    return this.http.get<Telefono[]>('http://localhost:3000/clientes/'+idCliente+'/telefonos');

  }

  getCliente(idCliente:string):Observable <Cliente>{
    return this.http.get<Cliente>('http://localhost:3000/clientes/' + idCliente );
  }
  deleteTelefono(numero:string){
    const body = { numero: numero };

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
  addTelefono(numero:string, id: number){
    const body = {
      numero: numero,
      cliente: id
    };

    // Define las cabeceras de la solicitud, si es necesario
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
  
    const options = { 
      headers: headers,
    };
  
    return this.http.post<any>(this.url, body, options);
  }
  editTelefono(telefono:Telefono){
      
    // Define las cabeceras de la solicitud, si es necesario
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
  
    const options = { headers: headers };
      //especificar tipo de datos
    return this.http.put<any>(this.url, telefono, options);
  }
}

