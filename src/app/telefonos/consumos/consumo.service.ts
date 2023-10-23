import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Consumo } from './consumo';


@Injectable({
  providedIn: 'root'
})
export class ConsumoService {

  url: string = 'http://localhost:3000/consumos/';
  constructor(private http: HttpClient) { }
  getAllConsumos(): Observable<Consumo[]>{
    return this.http.get<Consumo[]>(this.url);
  }
  getConsumosTelefono(id_telefono:string): Observable<Consumo[]>{
    return this.http.get<Consumo[]>(this.url +'telefonos'+ id_telefono);
  }
  getConsumosCliente(id_cliente:string): Observable<Consumo[]>{
    return this.http.get<Consumo[]>(this.url +'clientes'+ id_cliente);
  }
}
