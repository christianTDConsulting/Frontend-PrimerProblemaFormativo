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
import { SpeedDialModule } from 'primeng/speeddial';

import { ToggleButtonModule } from 'primeng/togglebutton';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { AccordionModule } from 'primeng/accordion';
import { ChartModule } from 'primeng/chart';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { CardModule } from 'primeng/card';

import { InputNumberModule } from 'primeng/inputnumber';
import { CalendarModule } from 'primeng/calendar';
import { ConsumoComponent } from './consumos/consumo.component';

@NgModule({
  declarations: [
    TelefonosComponent,
    ConsumoComponent
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
    OverlayPanelModule,
    CardModule,
    InputNumberModule,
    CalendarModule,
    SpeedDialModule
    
  ], 
  exports: [
    TelefonosComponent
  ]
})
export class TelefonosModule { }
