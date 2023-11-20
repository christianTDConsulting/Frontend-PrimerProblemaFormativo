import { Component, Input, OnInit } from '@angular/core';
import { DetallePrediccion } from 'src/app/models/municipio';

@Component({
  selector: 'app-nieve',
  templateUrl: './nieve.component.html',
  styleUrls: ['./nieve.component.css']
})
export class NieveComponent implements OnInit {

  constructor() { }
  @Input() detalles!: DetallePrediccion[];
  ngOnInit() {
  }

}
