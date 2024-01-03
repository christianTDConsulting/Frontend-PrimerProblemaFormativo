import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';


import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { DataViewModule } from 'primeng/dataview';
import { CommonModule } from '@angular/common';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { ToolbarModule } from 'primeng/toolbar';

import { ImagenCartel } from 'src/app/models/images';
import { DropdownModule } from 'primeng/dropdown';


@Component({
  selector: 'app-imagesCheckerHistorialDataView',
  templateUrl: './imagesCheckerHistorialDataView.component.html',
  standalone: true,
  imports: [ 
    TagModule,
    ButtonModule,
    FormsModule,
    CommonModule,
    DataViewModule,
    DropdownModule,
    ScrollPanelModule,
    ToolbarModule
   
  ],
  styleUrls: ['./imagesCheckerHistorialDataView.component.css']
})
export class ImagesCheckerHistorialDataViewComponent implements OnChanges {

  @Input() imagenesInput!: ImagenCartel[];
  imagenes: ImagenCartel[] = [];
  statusOptions = [
    {name: 'muy alta', code: 'muy alta'},
    {name: 'alta', code: 'alta'},
    {name: 'media', code: 'media'},
    {name: 'baja', code: 'baja'},
    {name: 'muy baja', code: 'muy baja'},
    {name: 'ninguna', code: 'ninguna'},

  
  ];

  imagenesFiltradas: ImagenCartel[] = [];
  cargando = true;

  
  
  


  constructor() { }

 
  ngOnChanges(changes: SimpleChanges) {
    if (changes['imagenesInput'] && changes['imagenesInput'].currentValue) {
      this.imagenes = changes['imagenesInput'].currentValue;
      this.imagenesFiltradas = this.imagenes;
      console.log(this.imagenes);
    }
  }

  getSeverity(imagen: ImagenCartel) {
    switch (imagen.resultado) {
        case 'muy alta':
            return 'success' as string;

        case 'alta':
            return 'success' as string;

        case 'media':
            return 'warning' as string;
        case 'baja':
            return 'danger' as string;
        case 'muy baja':
            return 'danger' as string;
        case 'ninguna':
            return 'danger' as string;

        default:
            return undefined;
    }
};

onStatusChange(selectedStatus: any) {
  
    // Filtrar imágenes basándose en el estado seleccionado
    console.log(selectedStatus);
    this.imagenesFiltradas = this.imagenes.filter(imagen => imagen.resultado === selectedStatus.code);
  
}

clear() {
  this.imagenesFiltradas = [...this.imagenes];
}






  
 



}
