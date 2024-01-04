import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewVodafoneComponent } from './viewVodafone.component';
import { ImageCheckerHistorialComponent } from 'src/app/pages/viewVodafone/components/imageCheckerHistorial/imageCheckerHistorial.component';
import { SelectButtonModule } from 'primeng/selectbutton';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    ImageCheckerHistorialComponent,
    SelectButtonModule,
    FormsModule
 
  ],
  declarations: [ViewVodafoneComponent]
})
export class ViewVodafoneModule { }
