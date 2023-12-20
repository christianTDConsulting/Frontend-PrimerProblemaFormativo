import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-imageCheckerHistorial',
  templateUrl: './imageCheckerHistorial.component.html',
  styleUrls: ['./imageCheckerHistorial.component.css'],

})
export class ImageCheckerHistorialComponent implements OnInit {

  mostrarNuevaImagen = false;
  imagenes: any = [];
  ordenAscendente = true; 

  constructor() { }
  
  ngOnInit() {
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
