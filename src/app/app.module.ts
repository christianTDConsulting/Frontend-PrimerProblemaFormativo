import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CookieService } from 'ngx-cookie-service';

import { ButtonModule } from 'primeng/button';

import { ViewAdminModule } from './pages/viewAdmin/viewAdmin.module';
import { ViewLoginModule } from './pages/viewLogin/viewLogin.module';
import { TelefonosModule } from './pages/viewClientes/viewCliente.module';
import { ViewMunicipiosModule } from './pages/viewMunicipios/viewMunicipios.module';
import { ViewEmpresasAtpModule } from './pages/viewEmpresasAtp/viewEmpresasAtp.module';

import { MenubarModule } from 'primeng/menubar';


@NgModule({
  declarations: [		
    AppComponent,

    
   ],
  imports: [
    
    ButtonModule,

    BrowserModule,
    AppRoutingModule,
    MenubarModule,
    ViewAdminModule,
    ViewLoginModule,
    TelefonosModule,
    ViewMunicipiosModule,
    ViewEmpresasAtpModule 
    
  ],
  providers: [CookieService,],
  bootstrap: [AppComponent]
})
export class AppModule { }
