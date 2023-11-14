import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TelefonosComponent } from '../../components/telefonoDialog/telefono/telefonos.component';
import { HttpClientModule } from '@angular/common/http';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { RouterModule } from '@angular/router';

import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog';
import { ToastModule } from 'primeng/toast';
import { SpeedDialModule } from 'primeng/speeddial';

import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { AccordionModule } from 'primeng/accordion';
import { ChartModule } from 'primeng/chart';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { CardModule } from 'primeng/card';

import { SelectButtonModule } from 'primeng/selectbutton';
import { InputNumberModule } from 'primeng/inputnumber';
import { CalendarModule } from 'primeng/calendar';
import { ConsumoComponent } from '../../components/telefonoDialog/telefono/consumos/consumo.component';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { InputMaskModule } from 'primeng/inputmask';
import { ToolbarModule } from 'primeng/toolbar';
import { DropdownModule } from 'primeng/dropdown';


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
    AccordionModule,
    ChartModule,
    OverlayPanelModule,
    CardModule,
    InputNumberModule,
    CalendarModule,
    SpeedDialModule,
    ConfirmDialogModule,
    SelectButtonModule,
    InputMaskModule,
    ToolbarModule,
    DropdownModule
    
  ], 
  providers: [ConfirmationService, DialogService],
  exports: [
    TelefonosComponent,
    ConsumoComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TelefonosModule { }
