import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from "ngx-cookie-service";

@Injectable({
  providedIn: 'root'
})

export class LoginService {
private usuarioUrl = 'http://localhost:3000/usuarios';

constructor(private http: HttpClient, private cookies: CookieService) { }

crearUsuario(usuario: any): Observable<any> {
  return this.http.post<any>(this.usuarioUrl, usuario);
}

editarUsuario(usuario: any): Observable<any> {
  return this.http.put<any>(this.usuarioUrl, usuario);
}

verUsuarios(): Observable<any[]> {
  return this.http.get<any[]>(this.usuarioUrl);
}

verLogs(): Observable<any[]> {
  const logsUrl = 'http://localhost:3000/logs';
  return this.http.get<any[]>(logsUrl);
}

postLogs(log: any): Observable<any> {
  const logsUrl = 'http://localhost:3000/logs';
  return this.http.post<any>(logsUrl, log);
}

verificarUsuario(email: string, plainPassword: string): Observable<any> {
  const verificarUrl = 'http://localhost:3000/verificar';
  const usuario = { email, plainPassword };
  return this.http.post<any>(verificarUrl, usuario);
}

getUsuarioById(id: number): Observable<any> {
  const usuarioUrl = `${this.usuarioUrl}/${id}`;
  return this.http.get<any>(usuarioUrl);
}

getUsuarioByEmail(email: string): Observable<any> {
  const usuarioUrl = `${this.usuarioUrl}/email/${email}`;
  return this.http.get<any>(usuarioUrl);
}
setToken(token: string) {
  this.cookies.set("token", token);
}
getToken() {
  return this.cookies.get("token");
}
}
