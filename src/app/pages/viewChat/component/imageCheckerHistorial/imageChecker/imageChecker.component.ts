import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ToastModule } from 'primeng/toast';
import { ImageCheckerService } from 'src/app/services/images/imageChecker.service';


@Component({
  selector: 'app-imageChecker',
  templateUrl: './imageChecker.component.html',
  standalone: true,
  imports : [
    CardModule,
    ToastModule,
    ButtonModule,
    CommonModule
  ],
  providers: [MessageService],
  styleUrls: ['./imageChecker.component.css']
})


export class ImageCheckerComponent implements OnInit {


  cargando: boolean = false;
  //selectedImages: File[] = [];
  selectedImage: File | null = null;
  imageResult: File | null = null;
  constructor(private messageService: MessageService, private imageChecker: ImageCheckerService) {}


  ngOnInit() {
  }




/*
  onFileSelect(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (input && input.files) {
      for (let i = 0; i < input.files.length; i++) {
        const file = input.files[i];
        this.selectedImages.push(file);
      }
    }
  }
 

  

  removeImage(index: number): void {
    this.selectedImages.splice(index, 1);
  }
  
 
*/

  onFileSelect(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input && input.files) {
      for (let i = 0; i < input.files.length; i++) {
        const file = input.files[i];
        this.selectedImage = file;
      }
    }
  }
  removeImage(): void {
    this.selectedImage = null;
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
    if (this.selectedImage) {
      this.imageChecker.uploadImage(this.selectedImage).subscribe(
        (res: any) => {
          
          this.cargando = false;
          this.messageService.add({ severity: 'success', summary: 'Operación completada', detail: 'Imagenes procesadas' });
        }
      );
    }
    
   
  }
}
