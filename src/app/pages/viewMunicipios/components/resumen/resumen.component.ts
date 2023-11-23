import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { DetallePrediccion } from 'src/app/models/municipio';

@Component({
  selector: 'app-resumen',
  templateUrl: './resumen.component.html',
  styleUrls: ['./resumen.component.css']
})
export class ResumenComponent implements OnInit {

  constructor() { }
  @Input() detalles!: DetallePrediccion[];
  @Input() municipio!: string;
  @Input() fecha!: string;
  cielo: DetallePrediccion = {
    nombre: '',
    fecha: new Date(),
    hora: 0,
    valor: '',
    periodo: '',
    descripcion: '',
    velocidad: 0,
    direccion: '',
  }
  velocidad:number = 0;

  precipitacion: string = '';
  
  gradosMaximos: number = 0;
  gradosMinimos: number = 0;
  ngOnInit() {
    
  }


  ngOnChanges(changes: SimpleChanges) {
    if (changes['detalles']) {
      this.initParams();
    }
  }
  initParams(){
    
    this.detalles.forEach(element => {
      if (element.nombre==='estadoCielo' && element.periodo==='00-24') {
        this.cielo = element;
       
      }
      if (element.nombre==='temperatura_maxima'){
        this.gradosMaximos = parseFloat(element.valor);
      }
      if (element.nombre==='temperatura_minima'){
        this.gradosMinimos = parseFloat(element.valor);
      }

      if (element.nombre==='viento' && element.periodo==='00-24') {
        this.velocidad = element.velocidad;
      }

      if (element.nombre==='probPrecipitacion' && element.periodo==='00-24') {
        this.precipitacion = element.valor;
      }
      
     
    });
  }

  getImage(){
    return 'assets/images/cielo/'+this.cielo.valor+'.png';
  }


}
