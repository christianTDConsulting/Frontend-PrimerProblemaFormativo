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
  getConsumosTelefono(id_telefono:number): Observable<Consumo[]>{
    return this.http.get<Consumo[]>(this.url +'telefonos/'+ id_telefono);
  }
  getConsumosCliente(id_cliente:string): Observable<Consumo[]>{
    return this.http.get<Consumo[]>(this.url +'clientes/'+ id_cliente);
  }
  createConsumo(consumo:Consumo){
    
    // Define las cabeceras de la solicitud, si es necesario
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
  
    const options = { 
      headers: headers,
    };
  
    return this.http.post<any>(this.url, consumo, options);
  }

  editConsumo(consumo:Consumo){
      
    // Define las cabeceras de la solicitud, si es necesario
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
  
    const options = { headers: headers };
      //especificar tipo de datos
    return this.http.put<any>(this.url, consumo, options);
  }
  deleteConsumo(id:number){
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

  getConsumoById(id:number){
    return this.http.get<Consumo>(this.url + id);
  }

  getMediaMaxMin(id_telefono:number){
    return this.http.get<any>('http://localhost:3000/mediaMaxMinConsumo/'+ id_telefono);
  }

  getClienteData(id_consumo:number){
    return this.http.get<any>(this.url+ 'clientedata/'+id_consumo);
  }
  
}
