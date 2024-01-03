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
import { ToastModule } from 'primeng/toast';

import { MessageService } from 'primeng/api';

export interface modelo {
  url:string,
  timestamp:Date
}

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
    ToastModule,
   
    ToolbarModule,
    AccordionModule,
    ProgressSpinnerModule,
    DialogModule,
    
   ],
  styleUrls: ['./imageCheckerHistorial.component.css'],
  providers: [MessageService]

})


export class ImageCheckerHistorialComponent implements OnInit {


  mostrarNuevaImagen = false;
  imagenes: ImagenCartel[] = [];

  modelos: modelo [] = [];
  itemsPerPage: number = 8; 
  first: number = 0;

  cargando = true;

  dialogVisibility: boolean = false;
  selectedModel : modelo  = {url: '', timestamp: new Date()}
  imagenesDialog: ImagenCartel[] = [];

  ordenAscendente = false; 

  constructor(private imageService: ImageCheckerService, private messageService: MessageService
   ) { }
  
  ngOnInit() {
    this.initImages();
  }

  clear() {
    this.cargando = true;
    this.initImages(true);

  }
  

  get modelosPaginados() {
  //console.log(this.first +" "+  this.first + this.itemsPerPage);
  return this.modelos.slice(this.first, this.first + this.itemsPerPage);
  }
  
  private initImages(clear: boolean = false)  {
    this.imageService.getImages().subscribe(
      (data: ImagenCartel[]) => {
       
        this.modelos = data.map((imagen: ImagenCartel) => ({
          url: imagen.modelo,             
          timestamp: new Date(imagen.timestamp)  
        }));
        this.imagenes = data;
        console.log(this.modelos);
        if (clear) {
          this.messageService.add({ severity: 'success', summary: 'Refrescado' });
        }
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
      this.first = event.first;
    }
    

   
  openDialog(modelo: modelo): void {

    this.selectedModel = modelo;
    this.imagenesDialog = this.getImagenes(modelo.url);
    this.dialogVisibility = true;
    
  }

  onDialogClose(): void {
    this.dialogVisibility= false;
  }

  ordenarPorFecha() {

    this.ordenAscendente = !this.ordenAscendente;
    
    this.modelos.sort((a, b) => {
      const fechaA = new Date(a.timestamp).getTime(); 
      const fechaB = new Date(b.timestamp).getTime();
      return this.ordenAscendente ? fechaA - fechaB : fechaB - fechaA;
    });
    
    this.first = 0;
  }

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
  
}



