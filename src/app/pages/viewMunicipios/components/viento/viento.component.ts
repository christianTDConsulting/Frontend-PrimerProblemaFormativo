import { Component, Input, OnInit } from '@angular/core';
import { DetallePrediccion } from 'src/app/models/municipio';

@Component({
  selector: 'app-viento',
  templateUrl: './viento.component.html',
  styleUrls: ['./viento.component.css']
})
export class VientoComponent implements OnInit {

  @Input() detalles!: DetallePrediccion[];
  constructor() { }

  ngOnInit() {
  }

}
