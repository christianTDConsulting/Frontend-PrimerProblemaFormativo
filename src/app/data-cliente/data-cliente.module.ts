import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DataClienteComponent } from './data-cliente.component';

import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';

import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { FormsModule } from '@angular/forms';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { ToastModule } from 'primeng/toast';
import { ReactiveFormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
@NgModule({
  declarations: [
    DataClienteComponent
  ],
  imports: [
    CommonModule,
  
    TableModule,
    ButtonModule,
    FormsModule,
    DynamicDialogModule,
    ToastModule,
    InputTextModule,
    InputTextareaModule,
    ReactiveFormsModule,
    CalendarModule
  ], 
  exports: [
    DataClienteComponent
  ]
  
})
export class DataClienteModule { }
