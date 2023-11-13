import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http'
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { RouterModule } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { ToastModule } from 'primeng/toast';
import { SpeedDialModule } from 'primeng/speeddial';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { ToolbarModule } from 'primeng/toolbar';
import { DropdownModule } from 'primeng/dropdown';
import { TelefonoDialogModule } from 'src/app/pages/viewClientes/telefonoDialog/telefonoDialog.module';
import { DataClienteModule } from 'src/app/formDialog/data-cliente/data-cliente.module';
import { ViewAdminComponent } from './viewAdmin.component';

import { DynamicDialogConfig } from 'primeng/dynamicdialog';

@NgModule({
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

    ToastModule,
    DataClienteModule,
    SpeedDialModule,
    ConfirmDialogModule,
    ToolbarModule,
    TelefonoDialogModule,
    DropdownModule
  ],
  declarations: [ViewAdminComponent],
  exports: [ViewAdminComponent],
  providers: [ConfirmationService, DialogService, DynamicDialogConfig]
})
export class ViewAdminModule { }
