import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
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
    //console.log(this.detalles);
 
  }


  getImage(valor:string){
    return 'assets/images/cielo/'+valor+'.png';
  }



}
