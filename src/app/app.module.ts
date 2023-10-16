import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { ClientesModule } from './clientes/clientes.module';
import { TelefonosModule } from './telefonos/telefonos.module';

@NgModule({
  declarations: [
    AppComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ClientesModule,
    TelefonosModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
