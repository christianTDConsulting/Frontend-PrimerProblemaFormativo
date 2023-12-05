import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from 'src/app/models/cliente';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

constructor(private http: HttpClient) { }
private usuarioUrl = 'http://localhost:3000/usuarios';

crearUsuario(usuario: any): Observable<any> {
  return this.http.post<any>(this.usuarioUrl, usuario);
}

crearUsuarioYCliente(usuario: any, cliente: any): Observable<any> {

  const usuarioData = { email: usuario.email, plainPassword: usuario.password };
  const clienteData = {
    nombre: cliente.nombre,
    bio: cliente.bio,
    nacimiento: cliente.nacimiento,
  };

  return this.http.post<any>('http://localhost:3000/usuarioCliente', {
    usuarioData,
    clienteData,
  });

}


editarUsuario(usuario: any): Observable<any> {
  return this.http.put<any>(this.usuarioUrl, usuario);
}

verUsuarios(): Observable<any[]> {
  return this.http.get<any[]>(this.usuarioUrl);
}



getUsuarioById(id: number): Observable< Usuario> {
  const usuarioUrl = `${this.usuarioUrl}/${id}`;
  return this.http.get<Usuario>(usuarioUrl);
}

getUsuarioByEmail(email: string): Observable<any> {
  const usuarioUrl = `${this.usuarioUrl}/email/${email}`;
  return this.http.get<any>(usuarioUrl);
}
}
