import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';


import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { DataViewModule } from 'primeng/dataview';
import { CommonModule } from '@angular/common';
import { ImagenCartel } from 'src/app/models/images';
import { ScrollPanelModule } from 'primeng/scrollpanel';

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
    ScrollPanelModule
   
  ],
  styleUrls: ['./imagesCheckerHistorialDataView.component.css']
})
export class ImagesCheckerHistorialDataViewComponent implements OnChanges {

  @Input() imagenesInput!: ImagenCartel[];
  imagenes: ImagenCartel[] = [];

  cargando = true;
  

  ordenAscendenteSimilitud = true;
  mostrarNuevaImagen = false;
  
  
  
  responsiveOptions = [
    {
        breakpoint: '1199px',
        numVisible: 1,
        numScroll: 1
    },
    {
        breakpoint: '991px',
        numVisible: 2,
        numScroll: 1
    },
    {
        breakpoint: '767px',
        numVisible: 1,
        numScroll: 1
    }
];


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
