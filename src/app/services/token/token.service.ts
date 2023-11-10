import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from "ngx-cookie-service";
import { Cliente } from '../../models/cliente';

@Injectable({
  providedIn: 'root'
})

export class TokenService {


constructor(private http: HttpClient, private cookies: CookieService) { }


//Authentication
verificarUsuario(email: string, plainPassword: string): Observable<any> {
  const verificarUrl = 'http://localhost:3000/verificar';
  const usuario = { email, plainPassword };
  return this.http.post<any>(verificarUrl, usuario);
}
setToken(token: string) {
  this.cookies.set("token", token);
}
getToken() {
  return this.cookies.get("token");
}

decodeToken(): Observable<Cliente> {
  const token = this.getToken(); // Obtén el token de las cookies o de donde lo almacenes

  
  return  this.http.get<Cliente>('http://localhost:3000/token/' + token);

}
deleteToken() {
  this.cookies.delete("token"); // Elimina el token de las cookies
}



}
