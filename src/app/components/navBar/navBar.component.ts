import { Component, OnInit } from '@angular/core';
import { AuthEventService } from 'src/app/services/auth-event/auth-event.service'; 
import { ChatService } from 'src/app/services/chat/chat.service';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { TokenService } from 'src/app/services/token/token.service'; 


@Component({
  selector: 'app-navBar',
  templateUrl: './navBar.component.html',
  styleUrls: ['./navBar.component.css']
})
export class NavBarComponent implements OnInit {




  user:string="user";

  constructor(
    private tokenService: TokenService,
    private authEventService: AuthEventService,
    private chatService: ChatService,
    private router: Router,
    ) {
    
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
          if (this.isLogged){
            this.tokenService.decodeToken().subscribe(
              (response: any) => {
                const perfil = response.usuario.id_perfil;
                if (perfil === 1){
                  this.router.navigate(['/viewClient']);
                }else if (perfil === 2){
                  this.router.navigate(['/viewAdmin']);
                }
              }
            );
          }
         
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

  isLogged: boolean = false;
  ngOnInit(): void {
    this.isLogged = this.getInitialLogged();
    if (this.isLogged) {
      this.assignUserToNavBar();
    }
    
    this.authEventService.loginEvent.subscribe(() => {
      this.isLogged = true;
      this.assignUserToNavBar();
      
    });

    this.authEventService.logoutEvent.subscribe(() => {
      this.isLogged = false;
      
    });
  }
  
 
private assignUserToNavBar() {
  this.tokenService.decodeToken().subscribe(
    (response: any) => {
      this.user=response.usuario.email;
    }
  );
}
  getInitialLogged(): boolean {
    return this.tokenService.getToken() != null && this.tokenService.getToken() != '';
  }
  cerrarSesion(){
    this.authEventService.emitLogoutEvent();
    this.tokenService.deleteToken();
    this.chatService.disconnect();
    localStorage.clear();
    this.router.navigate(['/viewLogin']);
  }

}
