import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewEmpresasAtpComponent } from './viewEmpresasAtp.component';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { CardModule } from 'primeng/card';

@NgModule({
  imports: [
    CommonModule,
    TableModule,
    ButtonModule,
    DropdownModule,
    CardModule
  ],
  declarations: [ViewEmpresasAtpComponent]
})
export class ViewEmpresasAtpModule { }
