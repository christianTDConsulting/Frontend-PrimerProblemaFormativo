import { Component, Input, OnInit } from '@angular/core';
import { DetallePrediccion } from 'src/app/models/municipio';

@Component({
  selector: 'app-cielo',
  templateUrl: './cielo.component.html',
  styleUrls: ['./cielo.component.css']
})
export class CieloComponent implements OnInit {

  @Input() detalles!: DetallePrediccion[];
  
  constructor() { }

  ngOnInit() {
  }

}
