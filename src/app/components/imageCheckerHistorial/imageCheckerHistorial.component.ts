import { Component, OnInit } from '@angular/core';

import { ImageCheckerComponent } from '../imageChecker/imageChecker.component';
import { ImagesCheckerHistorialDataViewComponent } from './imagesCheckerHistorialDataView/imagesCheckerHistorialDataView.component';

import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';

import { ToolbarModule } from 'primeng/toolbar';
import { AccordionModule } from 'primeng/accordion';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { PaginatorModule } from 'primeng/paginator';

import { ImageCheckerService } from 'src/app/services/images/imageChecker.service';
import { ImagenCartel } from 'src/app/models/images';
import { DialogModule } from 'primeng/dialog';




@Component({
  selector: 'app-imageCheckerHistorial',
  templateUrl: './imageCheckerHistorial.component.html',
  standalone: true,
  imports: [
    ImageCheckerComponent,
    ImagesCheckerHistorialDataViewComponent, 
    CardModule,
    ButtonModule,
    CommonModule,
    PaginatorModule,
   
    ToolbarModule,
    AccordionModule,
    ProgressSpinnerModule,
    DialogModule
   ],
  styleUrls: ['./imageCheckerHistorial.component.css'],

})
export class ImageCheckerHistorialComponent implements OnInit {


  mostrarNuevaImagen = false;
  imagenes: ImagenCartel[] = [];

  modelos: string [] = [];
  itemsPerPage: number = 5; 
  first: number = 0;

  cargando = true;
  dialogVisibility: boolean[] = [];

  activeTabIndex: number | null = null; // null indica que ningún tab está activo
  imagenesDialog: ImagenCartel[][] = [];

  constructor(private imageService: ImageCheckerService,
   ) { }
  
  ngOnInit() {
    this.initImages();
  }

   get modelosPaginados() {
    return this.modelos.slice(this.first, this.itemsPerPage);
  }
  private initImages() {
    this.imageService.getImages().subscribe(
      (data: ImagenCartel[]) => {
       
        this.modelos = data.map((imagen: ImagenCartel) => imagen.modelo).filter((value, index, self) => self.indexOf(value) === index);
        this.imagenes = data;
        console.log(this.modelos);
        
        this.cargando = false;
      },
      (error) => {
        console.error('Error fetching images', error);
      }
    );
  }

  
 
    
  
    getImagenes(modelo: string): ImagenCartel[] {

      return this.imagenes.filter((imagen: ImagenCartel) => imagen.modelo === modelo);
      
    }

    onPageChange(event: any) {
      this.first += this.itemsPerPage;
    }
    
   onTabOpen(event: any) {
      this.imagenesDialog[event.index] = this.getImagenes(this.modelos[event.index]);
     
      this.openDialogForTab(event.index);
  }

  onDialogClose() {
   
    
    this.activeTabIndex = null;
    
  }

  openDialogForTab(tabIndex: number) {
    this.dialogVisibility[tabIndex] = true;
  }
  
}

