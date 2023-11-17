import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DetallePrediccion, Municipio } from 'src/app/models/municipio';
import { MetereologiaService } from 'src/app/services/metereologia/metereologia.service';
@Component({
  selector: 'app-viewMunicipios',
  templateUrl: './viewMunicipios.component.html',
  styleUrls: ['./viewMunicipios.component.css']
})
export class ViewMunicipiosComponent implements OnInit {

  constructor(
    private router: Router,
    private metereologiaService: MetereologiaService
    
    ) { }

  municipio: Municipio = {
    id: 0,
    nombre: '',
    provincia: '',
  };
  detalles: DetallePrediccion[] = [];

  ngOnInit() {
   
  }

  goToLogin(){
    this.router.navigate(['/viewLogin']);
  }

}
