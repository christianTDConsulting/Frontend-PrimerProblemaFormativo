import { Component, OnInit } from '@angular/core';
import { ImageCheckerComponent } from '../imageChecker/imageChecker.component';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { DataViewModule } from 'primeng/dataview';
import { TagModule } from 'primeng/tag';
import { ToolbarModule } from 'primeng/toolbar';
import { ImageCheckerService } from 'src/app/services/images/imageChecker.service';


@Component({
  selector: 'app-imageCheckerHistorial',
  templateUrl: './imageCheckerHistorial.component.html',
  standalone: true,
  imports: [
    ImageCheckerComponent, 
    CardModule,
    ButtonModule,
    CommonModule,
    DataViewModule,
    TagModule,
    ToolbarModule
   ],
  styleUrls: ['./imageCheckerHistorial.component.css'],

})
export class ImageCheckerHistorialComponent implements OnInit {

  mostrarNuevaImagen = false;
  imagenes: any = [];
  ordenAscendente = true; 

  constructor(private imageService: ImageCheckerService) { }
  
  ngOnInit() {
    this.imageService.getImages().subscribe(
      (data) => {
        this.imagenes = data;
      },
      (error) => {
        console.error('Error fetching images', error);
      }
    );
  }

  /*
  getSeverity(product: Product) {
        switch (product.inventoryStatus) {
            case 'INSTOCK':
                return 'success';

            case 'LOWSTOCK':
                return 'warning';

            case 'OUTOFSTOCK':
                return 'danger';

            default:
                return null;
        }
    };
    */
  ordenarPorFecha() {
    /*this.ordenAscendente = !this.ordenAscendente;
    this.imagenes.sort((a, b) => {
      const fechaA = new Date(a.timestamp); 
      const fechaB = new Date(b.timestamp);
      return this.ordenAscendente ? fechaA - fechaB : fechaB - fechaA;
    });
    */
  }
  getResult(_t10: any): string|undefined {
    throw new Error('Method not implemented.');
  }
}
