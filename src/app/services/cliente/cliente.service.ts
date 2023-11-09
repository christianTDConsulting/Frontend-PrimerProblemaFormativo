import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cliente, Usuario } from '../../models/cliente';
import { forkJoin } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ClienteService {

  url: string = 'http://localhost:3000/clientes/';
  urlUser: string = 'http://localhost:3000/usuarios/';
  constructor(private http: HttpClient) { }


  getClientes(): Observable<any[]>{
    return  this.http.get<any[]>(this.url);
  }

  getClientesVisible(visible:Boolean): Observable<any[]>{
    return this.http.get<any[]>('http://localhost:3000/visible/clientes/'+visible );
  }
  editCredentialsUsuario(usuario:Usuario){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
  
    const options = { headers: headers };

    return this.http.put<any>(this.urlUser, usuario, options);
  }

  getUsuarioPorId(id: number)  {
    const usuarioUrl = `http://localhost:3000/usuarios/${id}`;
    return (this.http.get<any>(usuarioUrl));
  }
  
  deleteCliente(id:number){
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
  addCliente(cliente: Cliente){
    /*
    const body = { 
      
       nombre: cliente.nombre, 
       email: cliente.email,
       bio: cliente.bio, 
       nacimiento: cliente.nacimiento
      };
    */

    // Define las cabeceras de la solicitud, si es necesario
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
  
    const options = { 
      headers: headers, 
    };
    //especificar tipo de datos
    console.log(this.url);
    return this.http.post<any>(this.url, cliente, options);
  }


    editCliente(data: any) {
      // Define las cabeceras de la solicitud, si es necesario
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
      });
    
      const options = { headers: headers };
    
      const cliente = {
        id: data.id,
        nombre: data.nombre,
        email: data.email,
        bio: data.bio,
        nacimiento: data.nacimiento,
      };
    
      const usuario = {
        id: data.usuario.id,
        email: data.usuario.email,
        password: data.usuario.password,
      };
    
      // Combina ambas solicitudes en una sola
      return forkJoin([
        this.http.put<any>(this.url, cliente, options),
        this.http.put<any>(this.urlUser, usuario, options),
      ]);
  }
  
  getCliente(id:number): Observable<Cliente>{
    return this.http.get<Cliente>(this.url + id);
  }

  toggleVisibiltyCliente(id:number) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.put<any>(this.url + id.toString(), headers);
  }
  

  
}
