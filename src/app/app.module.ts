import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { TelefonosModule } from './telefonos/telefonos.module';
import { ClientesModule } from './clientes/clientes.module';
import { PanelModule } from 'primeng/panel';
import { CardModule } from 'primeng/card';

import { HttpClientModule } from '@angular/common/http'
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { RouterModule } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastModule } from 'primeng/toast';
import { SpeedDialModule } from 'primeng/speeddial';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { CookieService } from "ngx-cookie-service";
import { ToolbarModule } from 'primeng/toolbar';

import { MessageService } from 'primeng/api';

@NgModule({
  declarations: [	
    AppComponent,
    RegisterComponent,
    LoginComponent
    
   ],
  imports: [
    PanelModule,
    CardModule,
    BrowserModule,
    AppRoutingModule,
    ClientesModule,
    TelefonosModule,
    HttpClientModule,
    TableModule,
    ButtonModule,
    RouterModule,
    InputTextModule,
    FormsModule,
    ReactiveFormsModule,
    DynamicDialogModule,
    BrowserAnimationsModule,
    TelefonosModule,
    ToastModule,
    SpeedDialModule,
    ConfirmDialogModule,
    ToolbarModule,
    
  ],
  providers: [ MessageService, CookieService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
