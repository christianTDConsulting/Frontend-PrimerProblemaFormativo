import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewMunicipiosComponent } from './viewMunicipios.component';
import { ButtonModule } from 'primeng/button';
//import { MapMunicipiosComponent } from 'src/app/components/mapMunicipios/mapMunicipios.component';

@NgModule({
  imports: [
    CommonModule,
    ButtonModule
  ],
  declarations: [ViewMunicipiosComponent]
})
export class ViewMunicipiosModule { }
