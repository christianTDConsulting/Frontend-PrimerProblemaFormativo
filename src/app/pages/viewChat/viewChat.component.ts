import { Component, OnInit } from '@angular/core';
import { Articulo } from 'src/app/models/articulos';
import { ArticuloService } from '../../services/articulo/articulo.service';


@Component({
  selector: 'app-viewChat',
  templateUrl: './viewChat.component.html',
  styleUrls: ['./viewChat.component.css']
})
export class ViewChatComponent implements OnInit {

  constructor(private articuloService: ArticuloService) { }

  articulos: Articulo[] = []
  sidebarVisible: boolean = false;
  username: string = '';

  ngOnInit() {
    this.initArticulos();
    this.username = localStorage.getItem('username') || 'usuario';
  }

  initArticulos(){
    this.articuloService.getArticulos().subscribe(data => {
      this.articulos = data;
      
    })
  }

}
