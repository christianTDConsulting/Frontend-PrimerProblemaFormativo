import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { DetallePrediccion } from 'src/app/models/municipio';

@Component({
  selector: 'app-viento',
  templateUrl: './viento.component.html',
  styleUrls: ['./viento.component.css']
})
export class VientoComponent implements OnInit {

  @Input() detalles!: DetallePrediccion[];

  detallesViento: DetallePrediccion[] = [];
  detallesRachaMax: DetallePrediccion[] = [];
  
  chartData = {};
  chartMaxMin= {};

  chartOptionsViento = {
    plugins: {
      title: {
        display: true,
        text: 'Velocidad del viento en km/ hora  para cada periodo hacia el ' + this.getNameDireccion(),
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

  chartOptionsRachaMaxima = {
    plugins: {
      title: {
        display: true,
        text: 'Racha máxima en km/h para cada periodo',
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

  direcciones = [
    {name: 'Norte', code: 'N'},
    {name: 'Sur', code: 'S'},
    {name: 'Este', code: 'E'},
    {name: 'Oeste', code: 'O'},
    {name: 'Noreste', code: 'NE'},
    {name: 'Noroeste', code: 'NO'},
    {name: 'Sureste', code: 'SE'},
    {name: 'Suroeste', code: 'SO'},  
  ]

  direccionSelected = 'N';
  constructor() { }

  ngOnInit() {

    this.initCharts();
  }
  ngOnChanges(changes: SimpleChanges) {
    if (changes['detalles']) {
      this.initCharts();
    }
  }

  initCharts(){
    const backgroundColor = `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 0.2)`;
    const borderColor = `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 1)`;

   
  
    this.detallesRachaMax = this.detalles.filter((detalle: DetallePrediccion) => detalle.nombre === 'rachaMax');
   
    
   
  
    const periodosRachaMax = this.detallesRachaMax.map ((detalle: DetallePrediccion) => detalle.periodo); 
    const dataRachaMax: number[] = this.detallesRachaMax.map((detalle: DetallePrediccion) => {
      const valorComoNumero = parseFloat(detalle.valor);
      return isNaN(valorComoNumero) ? 0 : valorComoNumero;
    });
  


    

    const datasetRachaMax =  {
      labels:periodosRachaMax ,
      datasets: [
        {
          label: '(km/h / periodo)',
          data: dataRachaMax,
          borderColor: borderColor,
          backgroundColor: backgroundColor,
          borderWidth: 1,
      
        }
      ],
    };

   
    this.initVientoChart()
    this.chartMaxMin = datasetRachaMax;
  }

  initVientoChart(){
    const backgroundColor = `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 0.2)`;
    const borderColor = `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 1)`;

    this.detallesViento = this.detalles.filter((detalle: DetallePrediccion) => detalle.nombre === 'viento');
    console.log(this.direccionSelected);
    const detallesVientoDireccion = this.detallesViento.filter((detalle: DetallePrediccion) => detalle.direccion === this.direccionSelected);

    const periodosViento = detallesVientoDireccion.map ((detalle: DetallePrediccion) => detalle.periodo); 
    const dataViento: number[] = detallesVientoDireccion.map((detalle: DetallePrediccion) => {
      return detalle.velocidad;
    });

    const datasetViento =  {
      labels:periodosViento ,
      datasets: [
        {
          label: '(km/h / periodo)',
          data: dataViento,
          borderColor: borderColor,
          backgroundColor: backgroundColor,
          borderWidth: 1,
      
        }
      ],
    };

    this.chartOptionsViento  = {
      plugins: {
        title: {
          display: true,
          text: 'Velocidad del viento en km/ hora  para cada periodo hacia el ' + this.getNameDireccion(),
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
    this.chartData = datasetViento; 
  }

  getImage(direccion:string){
    return 'assets/images/viento/'+direccion+'.png';
  }

  updateDireccion(event: any){
    this.direccionSelected = event.value.code;
    this.initVientoChart();
  }
  getNameDireccion():string{
    if (!this.direcciones || !this.direccionSelected) {
      return 'Norte'; // Otra opción si alguna variable es undefined
    }

    const direccion = this.direcciones.find(d => d.code === this.direccionSelected);
    return direccion ? direccion.name : 'Norte';
  }
}
