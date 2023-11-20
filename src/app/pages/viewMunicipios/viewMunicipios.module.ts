import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewMunicipiosComponent } from './viewMunicipios.component';
import { ButtonModule } from 'primeng/button';
import { TabMenuModule } from 'primeng/tabmenu';
import { DropdownModule } from 'primeng/dropdown';
import { StepsModule } from 'primeng/steps';
import { CardModule } from 'primeng/card';

import { CieloComponent } from './components/cielo/cielo.component';
import { PrecipitacionComponent } from './components/precipitacion/precipitacion.component';
import { HumedadComponent } from './components/humedad/humedad.component';
import { VientoComponent } from './components/viento/viento.component';
import { NieveComponent } from './components/nieve/nieve.component';
import { TemperaturaComponent } from './components/temperatura/temperatura.component';
//import { MapMunicipiosComponent } from 'src/app/components/mapMunicipios/mapMunicipios.component';

@NgModule({
  imports: [
    CommonModule,
    ButtonModule,
    TabMenuModule,
    DropdownModule,
    StepsModule,
    CardModule
  ],
  declarations: [ViewMunicipiosComponent, CieloComponent, PrecipitacionComponent, HumedadComponent, VientoComponent, NieveComponent, TemperaturaComponent],
})
export class ViewMunicipiosModule { }
