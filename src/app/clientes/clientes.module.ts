import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http'
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { RouterModule } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';

import { ClientesComponent } from './clientes.component';



@NgModule({
  declarations: [
    ClientesComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    TableModule,
    ButtonModule,
    RouterModule,
    InputTextModule,
    FormsModule
    ],
  exports: [
    ClientesComponent
  ]
})
export class ClientesModule { }
