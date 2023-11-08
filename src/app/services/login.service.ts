import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from "ngx-cookie-service";
import * as jwt from "jsonwebtoken";


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

//Authentication
setToken(token: string) {
  this.cookies.set("token", token);
}
getToken() {
  return this.cookies.get("token");
}

isAuthenticated(): boolean {
  // Verifica si el usuario está autenticado 
  const token = this.getToken();
  if (token) {
    const isTokenValid = this.checkTokenExpirationAndRemove(); // Llama a checkTokenExpirationAndRemove si hay un token
    return isTokenValid;
  }
  return false; // Devuelve true si el token existe
}

removeToken(): void {
  // Elimina el token de las cookies
  this.cookies.delete('token');
}

decodeToken(): any {
  const token = this.getToken(); // Obtén el token de las cookies o de donde lo almacenes

  try {
    return jwt.decode(token);
  } catch(Error) {
    return null;
  }
}
checkTokenExpirationAndRemove(): boolean {
  const token = this.getToken();
  if (token) {
    const decodedToken = this.decodeToken();
    if (decodedToken && decodedToken.exp) {
      const currentTimestamp = Math.floor(Date.now() / 1000); // Obtén el tiempo actual en segundos
      if (decodedToken.exp < currentTimestamp) {
        // El token ha expirado, elimínalo de las cookies
        this.removeToken();
        return false; // El token ha expirado y se ha eliminado
      }
    }
    return true; // El token es válido
  }
  return false; // No se encontró un token
}

}