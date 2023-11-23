import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { DetallePrediccion } from 'src/app/models/municipio';

@Component({
  selector: 'app-temperatura',
  templateUrl: './temperatura.component.html',
  styleUrls: ['./temperatura.component.css']
})
export class TemperaturaComponent implements OnInit {

  @Input() detalles!: DetallePrediccion[];
  detallesTemperatura: DetallePrediccion[] = [];
  detallesMaxima: string = '';
  detallesMinima: string = '';

  chartData = {};
  chartOptions = {
    plugins: {
      title: {
        display: true,
        text: "Temperatura por horas en grados centígrados para cada hora del día",
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

    //this.initCharts()
  }


  ngOnChanges(changes: SimpleChanges) {
    if (changes['detalles']) {
      this.initCharts();
    }
  }

  initCharts(){
    const borderColor = `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 1)`;

    const detallesMaxima: DetallePrediccion[] = this.detalles.filter((detalle: DetallePrediccion) => detalle.nombre === 'temperatura_maxima');
    const detallesMinima: DetallePrediccion[]  = this.detalles.filter((detalle: DetallePrediccion) => detalle.nombre === 'temperatura_minima');

    
    if (detallesMaxima.length > 0 || detallesMinima.length > 0) {
      if (detallesMaxima[0]!= undefined && detallesMinima[0] != undefined) {
      this.detallesMaxima = detallesMaxima[0].valor;
      this.detallesMinima = detallesMinima[0].valor;
      }
    }
  
    
    this.detallesTemperatura = this.detalles.filter((detalle: DetallePrediccion) => detalle.nombre === 'temperatura');
    const periodos = this.detalles.map ((detalle: DetallePrediccion) => detalle.hora); 
    const data: number[] = this.detalles.map((detalle: DetallePrediccion) => {
      const valorComoNumero = parseFloat(detalle.valor);
      return (isNaN(valorComoNumero)  || valorComoNumero === undefined)? 0 : valorComoNumero;
    });

    console.log("detalles: " + this.detalles, "detalles filtrados: " +this.detallesTemperatura);
    const dataset =  {
      labels:periodos ,
      datasets: [
        {
          label: '(grados / horas)',
          data: data,
          borderColor: borderColor,
          borderWidth: 1,
      
        }
      ],
    };

    this.chartData = dataset; 
  }

}
