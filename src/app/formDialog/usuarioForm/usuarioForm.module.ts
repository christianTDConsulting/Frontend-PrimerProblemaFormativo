import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuarioFormComponent } from './usuarioForm.component';
import { ToastModule } from 'primeng/toast';
import { CalendarModule } from 'primeng/calendar';
import { InputMaskModule } from 'primeng/inputmask';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';

import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { CardModule } from 'primeng/card';
@NgModule({
  declarations: [
    UsuarioFormComponent
  ],
  imports: [
    CommonModule,
    TableModule,
    ButtonModule,
    ToastModule,
    InputTextModule,
    InputTextareaModule,
    CalendarModule,
    InputMaskModule,
    FormsModule,
    ReactiveFormsModule,
    CardModule
  ],
 exports: [
   UsuarioFormComponent
 ]
})
export class UsuarioFormModule { }
