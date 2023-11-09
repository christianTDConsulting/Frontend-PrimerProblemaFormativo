import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Telefono } from '../../models/telefono';



@Injectable({
  providedIn: 'root'
})
export class TelefonoService {

  url: string = 'http://localhost:3000/telefonos/';
  constructor(private http: HttpClient) { }

  getAllTelefonos(): Observable<Telefono[]>{

    return this.http.get<Telefono[]>(this.url);

  }
  getTelefonosClienteVisible(idCliente:number, visible:Boolean): Observable<Telefono[]>{
 
  
 
    return this.http.get<Telefono[]>('http://localhost:3000/visible/telefonos/'+idCliente+'/'+visible );
  }
  
  getTelefonosCliente(idCliente:number): Observable<Telefono[]>{

    return this.http.get<Telefono[]>('http://localhost:3000/clientes/'+idCliente+'/telefonos');

  }
  

  
  deleteTelefono(id:number){
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

  getClienteFromTlf(id_telefono:number): Observable<any>{
    return this.http.get<any>(this.url+ id_telefono+'/cliente');
  }

  toggleVisibiltyTelefono(id:number) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.put<any>(this.url + id.toString(), headers);
  }
  
}

