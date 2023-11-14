import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DataClienteComponent } from './data-cliente.component';

import { UsuarioFormModule } from '../usuarioForm/usuarioForm.module';

@NgModule({
  declarations: [
    DataClienteComponent,
  
  ],
  imports: [
    CommonModule,
    UsuarioFormModule,
   
  
  ], 
  exports: [
    DataClienteComponent
  ]
  
})
export class DataClienteModule { }
