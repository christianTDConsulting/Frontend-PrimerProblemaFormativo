import { Component } from '@angular/core';
import { AuthEventService } from './services/auth-event/auth-event.service';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { TokenService } from './services/token/token.service';

// Reemplaza con tu servicio de autenticación
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'application';
 
  
  user:string="user";
  constructor(
    private tokenService: TokenService,
    private authEventService: AuthEventService,
    private router: Router) {
    
  }


  refreshPage(): void {
    window.location.reload();
  }

  items: MenuItem[] = [
    {
      label:'Inicio',
      icon:'pi pi-fw pi-home',
      command: (event) => {
        if (window.location.pathname === '/viewLogin'  || window.location.pathname === '/viewClient' || window.location.pathname === '/viewAdmin'){ 
          location.reload(); // refresh the page
        } else {
          this.tokenService.decodeToken().subscribe(
            (response: any) => {
              const perfil = response.usuario.id_perfil;
              if (perfil === 1){
                this.router.navigate(['/viewClient']);
              }else if (perfil === 2){
                this.router.navigate(['/viewAdmin']);
              }
            }
          )
          this.router.navigate(['/viewLogin']); 
        }
      }
    },
    {
      label:'Metereologia',
      icon:'pi pi-fw pi-map',
      routerLink:'/viewMetereologia',
    },
    {
      label:'Empresas APD',
      icon:'pi pi-money-bill',
      routerLink:'/viewEmpresas',
    } ,
    {
      label:'Productos de comercio',
      icon:'pi pi-comments',
      routerLink:'/viewChat',
    }
  ];

  isLogged: boolean = this.getInitialLogged();
  ngOnInit(): void {
    this.tokenService.decodeToken().subscribe(
      (response: any) => {
        this.user=response.usuario.email;
      }
    )
    this.authEventService.loginEvent.subscribe(() => {
      this.isLogged = true;
      
    });

    this.authEventService.logoutEvent.subscribe(() => {
      this.isLogged = false;
      
    });
  }
  
 
  cerrarSesion(){
    this.authEventService.emitLogoutEvent();
    this.tokenService.deleteToken();
    this.router.navigate(['/viewLogin']);
  }
  onItemClick(event: any): void {
    // Lógica adicional al hacer clic en un elemento del menú
  }

  getInitialLogged(): boolean {
    return this.tokenService.getToken() != null && this.tokenService.getToken() != '';
  }
}
