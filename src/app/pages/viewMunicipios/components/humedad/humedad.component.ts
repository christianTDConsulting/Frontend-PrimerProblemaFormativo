import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { DetallePrediccion } from 'src/app/models/municipio';

@Component({
  selector: 'app-humedad',
  templateUrl: './humedad.component.html',
  styleUrls: ['./humedad.component.css']
})
export class HumedadComponent implements OnInit {

  constructor() { }

  detallesHumedad: DetallePrediccion[] = [];
  detallesMaxima: string = '';
  detallesMinima: string = '';

  chartData = {};
  chartOptions = {
    plugins: {
      title: {
        display: true,
        text: "Valor previsto de la humedad relativa al final del período considerado expresada en porcentaje.",
        align: 'center',
        font: {
          size: 24,
          weight: 'bold'
        },
        padding: {
          top: 10,
          bottom: 10
        }
      }
    }
  };

  @Input() detalles!: DetallePrediccion[];
  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['detalles']) {
      this.initCharts();
    }
  }

  initCharts(){
    const borderColor = `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 1)`;

    const detallesMaxima: DetallePrediccion[] = this.detalles.filter((detalle: DetallePrediccion) => detalle.nombre === 'humedad_relativa_maxima');
    const detallesMinima: DetallePrediccion[]  = this.detalles.filter((detalle: DetallePrediccion) => detalle.nombre === 'humedad_relativa_minima');

    
    if (detallesMaxima.length > 0 || detallesMinima.length > 0) {
      if (detallesMaxima[0]!= undefined && detallesMinima[0] != undefined) {
        this.detallesMaxima = detallesMaxima[0].valor;
        this.detallesMinima = detallesMinima[0].valor;
      }
     
    }
  
    
    this.detallesHumedad = this.detalles.filter((detalle: DetallePrediccion) => detalle.nombre === 'humedad_relativa');
    const periodos = this.detalles.map ((detalle: DetallePrediccion) => detalle.hora); 
    const data: number[] = this.detalles.map((detalle: DetallePrediccion) => {
      const valorComoNumero = parseFloat(detalle.valor);
      return (isNaN(valorComoNumero)  || valorComoNumero === undefined)? 0 : valorComoNumero;
    });

    console.log("detalles: " + this.detalles, "detalles filtrados: " +this.detallesHumedad);
    const dataset =  {
      labels:periodos ,
      datasets: [
        {
          label: '( %  / horas)',
          data: data,
          borderColor: borderColor,
          borderWidth: 1,
      
        }
      ],
    };

    this.chartData = dataset; 
  }

}
