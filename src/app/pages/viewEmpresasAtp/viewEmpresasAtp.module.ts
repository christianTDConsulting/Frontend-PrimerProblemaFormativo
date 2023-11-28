import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewEmpresasAtpComponent } from './viewEmpresasAtp.component';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';

@NgModule({
  imports: [
    CommonModule,
    TableModule,
    ButtonModule
  ],
  declarations: [ViewEmpresasAtpComponent]
})
export class ViewEmpresasAtpModule { }
