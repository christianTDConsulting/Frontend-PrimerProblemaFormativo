import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { DetallePrediccion } from 'src/app/models/municipio';

@Component({
  selector: 'app-precipitacion',
  templateUrl: './precipitacion.component.html',
  styleUrls: ['./precipitacion.component.css']
})
export class PrecipitacionComponent implements OnInit {

  @Input() detalles!: DetallePrediccion[];
  
  chartData = {};
  chartOptions = {
    plugins: {
      title: {
        display: true,
        text: '% de precipitación para cada periodo',
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
  constructor() { }

  ngOnInit() {
   // this.initCharts();
  }
  ngOnChanges(changes: SimpleChanges) {
    if (changes['detalles']) {
      console.log("cambio");
      this.initCharts();
    }
  }

  initCharts(){
    const backgroundColor = `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 0.2)`;
    const borderColor = `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 1)`;
    
    const periodos = this.detalles.map ((detalle: DetallePrediccion) => detalle.periodo); 
    const data: number[] = this.detalles.map((detalle: DetallePrediccion) => {
      const valorComoNumero = parseFloat(detalle.valor);
      return isNaN(valorComoNumero) ? 0 : valorComoNumero;
    });
    const dataset =  {
      labels:periodos ,
      datasets: [
        {
          label: '(% / periodo)',
          data: data,
          borderColor: borderColor,
          backgroundColor: backgroundColor,
          borderWidth: 1,
      
        }
      ],
    };

    this.chartData = dataset; 
  }

}
