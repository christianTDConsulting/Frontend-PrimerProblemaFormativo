import { Component, OnInit, Input } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Articulo } from 'src/app/models/articulos';


@Component({
  selector: 'app-gridView',
  templateUrl: './gridView.component.html',
  styleUrls: ['./gridView.component.css']
})
export class GridViewComponent implements OnInit {

  @Input () articulos: Articulo[] = [];
  display: boolean = false;
  articuloSeleccionado: Articulo | null = null;
  constructor(private messageService: MessageService) { }

  ngOnInit() {
    console.log(this.articulos);
  }

 

    showDetalles(articulo: Articulo) {
        this.articuloSeleccionado = articulo;
        this.display = true;
    }

    addToCart(articulo: Articulo) {
      console.log(articulo);
      this.messageService.add({ severity: 'success', summary: 'Operación completada', detail: 'Cohete mandado a la luna!' });
    }
}
