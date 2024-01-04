import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';

import { ConfirmationService, MessageService } from 'primeng/api';

import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ToastModule } from 'primeng/toast';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { TagModule } from 'primeng/tag';

import { ImageCheckerService } from 'src/app/services/images/imageChecker.service';
import { ImagenCartel } from 'src/app/models/images';

@Component({
  selector: 'app-imageChecker',
  templateUrl: './imageChecker.component.html',
  standalone: true,
  imports : [
    CardModule,
    ToastModule,
    ButtonModule,
    CommonModule,
    ProgressSpinnerModule,
    ConfirmDialogModule,
    TagModule
  ],
  providers: [MessageService],
  styleUrls: ['./imageChecker.component.css']
})


export class ImageCheckerComponent implements  OnChanges {



  cargando: boolean = false;
  selectedModel: File | null = null
  selectedImages: File[] = [];
  imagesResult: ImagenCartel[] = [];

  constructor(private messageService: MessageService, private imageChecker: ImageCheckerService, private confirmationService: ConfirmationService ) {}
  
  ngOnChanges(changes: SimpleChanges) : void{
  if (changes['selectedModel'] && changes['selectedModel'].currentValue) {
    setTimeout(() => {
      this.cargando = false;
    },0);
  }
 }


 
  onFileSelect(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (input && input.files) {
      for (let i = 0; i < input.files.length; i++) {
        const file = input.files[i];
        this.selectedImages.push(file);
      }
    }
  }

  onModelSelect(event: Event): void {
    const input = event.target as HTMLInputElement;

   this.selectedModel = input.files ? input.files[0] : null;
  }
 
 

  

  removeImage(index: number): void {
    this.selectedImages.splice(index, 1);
  }
  
 
    getImageSrc(file: File)  {
      if (file) {
        return URL.createObjectURL(file);
      } else {
        return '';
      }
    }

  async onCheck() {
    this.cargando = true;
    if (this.selectedImages && this.selectedModel) {
      this.imageChecker.uploadImages(this.selectedImages, this.selectedModel).subscribe(
        (res: ImagenCartel[]) => {
          console.log('Imágenes cargadas con éxito:', res);
          this.cargando = false;
          this.imagesResult = res;
          this.messageService.add({ severity: 'success', summary: 'Operación completada', detail: 'Imagenes procesadas' });
        },
        (error) => {
          // Manejar errores de carga de imágenes
          console.error('Error al cargar imágenes:', error);
        }
      );
    }
    
   
  }

  confirm() {
    this.confirmationService.confirm({
        header: 'Estás seguro?',
        message: 'Se eliminarán las imágenes seleccionadas.',
        accept: () => {
            this.messageService.add({ severity: 'info', summary: 'Confirmado', detail: 'Has aceptado', life: 3000 });
            this.selectedModel = null;
            this.selectedImages = []; 
        },
        reject: () => {
            this.messageService.add({ severity: 'error', summary: 'Rechazado', detail: 'Has rechazado', life: 3000 });
        }
    });
    
  }

  getSeverity(result: string) {
    switch (result) {
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
        case 'error':
            return 'info' as string;
        default:
            return undefined;
    }
};

clear() {
    this.selectedModel = null;
    this.selectedImages = [];
    this.imagesResult = [];
    this.cargando = false;
  }

}
