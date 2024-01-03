import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

import { DataViewModule } from 'primeng/dataview';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';

import { CommonModule } from '@angular/common';
import { ImagenCartel } from 'src/app/models/images';
@Component({
  selector: 'app-imagesCheckerHistorialDataView',
  templateUrl: './imagesCheckerHistorialDataView.component.html',
  standalone: true,
  imports: [ 
    DataViewModule,
    TagModule,
    ButtonModule,
    FormsModule,
    CommonModule
  ],
  styleUrls: ['./imagesCheckerHistorialDataView.component.css']
})
export class ImagesCheckerHistorialDataViewComponent implements OnChanges {

  @Input() imagenesInput!: ImagenCartel[];
  imagenes: ImagenCartel[] = [];
  constructor() { }

 
  ngOnChanges(changes: SimpleChanges) {
    if (changes['imagenesInput'] && changes['imagenesInput'].currentValue) {
      this.imagenes = changes['imagenesInput'].currentValue;
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






formatDate(date: Date | string) {

if (date instanceof Date) {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  };
  return date.toLocaleDateString(undefined, options);
} else if (typeof date === 'string') {
  const newDate = new Date(date);
  if (!isNaN(newDate.getTime())) {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    };
    return newDate.toLocaleDateString(undefined, options);
  }
}
return 'Fecha no válida';
}
cargando = true;
  
ordenAscendente = true; 
ordenAscendenteSimilitud = true;
mostrarNuevaImagen = false;
clear() {
  this.cargando = true;
  //this.initImages();
}


ordenarPorFecha() {

  this.ordenAscendente = !this.ordenAscendente;
  /*
  this.imagenes.sort((a, b) => {
    const fechaA = new Date(a.imagen.timestamp).getTime(); 
    const fechaB = new Date(b.imagen.timestamp).getTime();
    return this.ordenAscendente ? fechaA - fechaB : fechaB - fechaA;
  });
  */
  
  }
  
  ordenarPorSimilitud() {
  
  this.ordenAscendenteSimilitud = !this.ordenAscendenteSimilitud;
  /*
  this.imagenes.sort((a, b) => {
  
    const similitudValores = {
      'muy alta': 6,
      'alta': 5,
      'media': 4,
      'baja': 3,
      'muy baja': 2,
      'ninguna': 1,
    };
  
    
    const similitudA = similitudValores[a.imagen.resultado as keyof typeof similitudValores] || 0; 
    const similitudB = similitudValores[b.imagen.resultado as keyof typeof similitudValores] || 0; 
  
    // Ordenar de forma ascendente o descendente según 'ordenAscendente'
    if (this.ordenAscendente) {
      return similitudA - similitudB;
    } else {
      return similitudB - similitudA;
    }
  });
  */
  }




}
