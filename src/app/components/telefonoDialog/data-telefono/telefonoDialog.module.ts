import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TelefonoDialogComponent } from './telefonoDialog.component';
import { TelefonosModule } from '../../../pages/viewClientes/viewCliente/viewCliente.module'; 


@NgModule({
  imports: [
    CommonModule,
    TelefonosModule
  ],
  declarations: [TelefonoDialogComponent]
})
export class TelefonoDialogModule { }
