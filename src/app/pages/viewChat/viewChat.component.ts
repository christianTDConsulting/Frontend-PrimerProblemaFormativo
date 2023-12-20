import { Component, OnInit } from '@angular/core';
import { Articulo } from 'src/app/models/articulos';
import { ArticuloService } from '../../services/articulo/articulo.service';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';
import { Usuario } from 'src/app/models/cliente';


@Component({
  selector: 'app-viewChat',
  templateUrl: './viewChat.component.html',
  styleUrls: ['./viewChat.component.css']
})
export class ViewChatComponent implements OnInit {


  constructor(private articuloService: ArticuloService, private usuarioService: UsuarioService) { }

  articulos: Articulo[] = []
  sidebarGepetoVisible: boolean = false;
  sidebarVisibleImages: boolean = false;
  initialSidebarVisible: boolean = false;
  fullScreen: boolean= false;



  usuario: Usuario = {
    id: 0,
    email: '',
    password: '',
    id_perfil: 0
  };
  
  ngOnInit() {
    this.initArticulos();
    this.getUserInfoFromLocalStorage();
  }

  getUserInfoFromLocalStorage(){
 
    const id = localStorage.getItem('user_id');

    if (Number(id) &&Number(id) > 0) {
      this.usuarioService.getUsuarioById(Number(id)).subscribe(data => {
        this.usuario = data;
    
      });
    }
  }

  initArticulos(){
    this.articuloService.getArticulos().subscribe(data => {
      this.articulos = data;
      
    })
  }
  showGepeto() {
    this.initialSidebarVisible = false;
    this.sidebarGepetoVisible = true;
    }

  showImages(){
    this.initialSidebarVisible = false;
    this.sidebarVisibleImages = true;
  }

}
