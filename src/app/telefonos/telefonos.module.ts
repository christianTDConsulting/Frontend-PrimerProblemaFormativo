import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TelefonosComponent } from './telefonos.component';
import { HttpClientModule } from '@angular/common/http';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DynamicDialogModule } from 'primeng/dynamicdialog';

@NgModule({
  declarations: [
    TelefonosComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    TableModule,
    ButtonModule,
    RouterModule,
    FormsModule,
    DynamicDialogModule
  ], 
  exports: [
    TelefonosComponent
  ]
})
export class TelefonosModule { }
