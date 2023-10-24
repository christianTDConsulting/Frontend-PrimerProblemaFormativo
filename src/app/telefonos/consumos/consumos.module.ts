import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConsumosComponent } from './consumos.component';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

@NgModule({
  imports: [
    CommonModule,
    ToggleButtonModule,
    ProgressSpinnerModule,

  ],
  declarations: [ConsumosComponent]
})
export class ConsumosModule { }
