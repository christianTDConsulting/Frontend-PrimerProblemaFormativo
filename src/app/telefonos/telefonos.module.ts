import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TelefonosComponent } from './telefonos.component';
import { HttpClientModule } from '@angular/common/http';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { RouterModule } from '@angular/router';

import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { ToastModule } from 'primeng/toast';



import { ToggleButtonModule } from 'primeng/togglebutton';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { AccordionModule } from 'primeng/accordion';
import { ChartModule } from 'primeng/chart';
import { OverlayPanelModule } from 'primeng/overlaypanel';

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
    DynamicDialogModule,
    ToastModule,
    ReactiveFormsModule,
    ProgressSpinnerModule,
    ToggleButtonModule,
    AccordionModule,
    ChartModule,
    OverlayPanelModule
    
  ], 
  exports: [
    TelefonosComponent
  ]
})
export class TelefonosModule { }
