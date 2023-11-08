import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http'
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { RouterModule } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { ClientesComponent } from './clientes.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TelefonosModule } from '../telefonos/telefonos.module';
import { DataClienteModule } from '../formDialog/data-cliente/data-cliente.module';
import { ToastModule } from 'primeng/toast';
import { SpeedDialModule } from 'primeng/speeddial';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { ToolbarModule } from 'primeng/toolbar';
import { DropdownModule } from 'primeng/dropdown';
import { TelefonoDialogModule } from '../telefonos/telefonoDialog/telefonoDialog.module';
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
    FormsModule,
    DynamicDialogModule,
    BrowserAnimationsModule,
    TelefonosModule,
    ToastModule,
    DataClienteModule,
    SpeedDialModule,
    ConfirmDialogModule,
    ToolbarModule,
    TelefonoDialogModule,
    DropdownModule
 
    ],
  providers: [ConfirmationService],
  exports: [
    ClientesComponent,
   
  ]
})
export class ClientesModule { }
