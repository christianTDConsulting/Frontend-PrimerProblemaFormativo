import { Component, Input, OnInit } from '@angular/core';
import { DetallePrediccion } from 'src/app/models/municipio';

@Component({
  selector: 'app-humedad',
  templateUrl: './humedad.component.html',
  styleUrls: ['./humedad.component.css']
})
export class HumedadComponent implements OnInit {

  constructor() { }
  @Input() detalles!: DetallePrediccion[];
  ngOnInit() {
  }

}
