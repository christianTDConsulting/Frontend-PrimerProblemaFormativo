import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CookieService } from 'ngx-cookie-service';

import { ViewAdminModule } from './pages/viewAdmin/viewAdmin.module';
import { ViewLoginModule } from './pages/viewLogin/viewLogin.module';
import { TelefonosModule } from './pages/viewClientes/viewCliente.module';
import { ViewMunicipiosModule } from './pages/viewMunicipios/viewMunicipios.module';



@NgModule({
  declarations: [		
    AppComponent,

    
   ],
  imports: [
  
    BrowserModule,
    AppRoutingModule,
    ViewAdminModule,
    ViewLoginModule,
    TelefonosModule,
    ViewMunicipiosModule,


   
    
  ],
  providers: [CookieService,],
  bootstrap: [AppComponent]
})
export class AppModule { }
