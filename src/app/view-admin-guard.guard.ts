import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from './services/login/login.service'; // Importa el servicio de autenticación { LoginService } 
import { Cliente } from './models/cliente';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ViewAdminGuard implements CanActivate {
  constructor(private loginService: LoginService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const token = this.loginService.getToken(); // Obtén el token del servicio de autenticación

    return this.loginService.decodeToken().pipe(
      map((response: any) => {
        const perfil = response.usuario.id_perfil;
        if (token && perfil === 2) {
          return true; // El token es válido, permite el acceso a la ruta
        } else {
          // El token no es válido o no existe, redirige a la página de inicio de sesión
          // También puedes almacenar la última ruta visitada antes de la redirección
          localStorage.setItem('lastVisitedRoute', state.url);
          this.router.navigate(['/login']);
          return false;
        }
      })
    );
  }
}
