import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { DetallePrediccion } from 'src/app/models/municipio';

@Component({
  selector: 'app-nieve',
  templateUrl: './nieve.component.html',
  styleUrls: ['./nieve.component.css']
})
export class NieveComponent implements OnInit {

  chartData = {};
  chartOptions = {
    plugins: {
      title: {
        display: true,
        text: "Valor de la cota de nieve en metros para cada periodo",
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
  @Input() detalles!: DetallePrediccion[];
  ngOnInit() {
    //this.initCharts();
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
      return (isNaN(valorComoNumero)  || valorComoNumero === undefined)? 0 : valorComoNumero;
    });
    const dataset =  {
      labels:periodos ,
      datasets: [
        {
          label: '(metros / periodo)',
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
