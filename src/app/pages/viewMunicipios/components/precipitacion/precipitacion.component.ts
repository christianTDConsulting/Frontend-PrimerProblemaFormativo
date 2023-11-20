import { Component, Input, OnInit } from '@angular/core';
import { DetallePrediccion } from 'src/app/models/municipio';

@Component({
  selector: 'app-precipitacion',
  templateUrl: './precipitacion.component.html',
  styleUrls: ['./precipitacion.component.css']
})
export class PrecipitacionComponent implements OnInit {

  @Input() detalles!: DetallePrediccion[];
  
  constructor() { }

  ngOnInit() {
  }

}
