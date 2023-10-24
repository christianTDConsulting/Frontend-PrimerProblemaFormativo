import { Component } from '@angular/core';


import { TelefonoService } from './telefono.service';
import { Telefono } from './telefono';
import { Cliente } from '../clientes/cliente';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';
import { FormControl, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import {Consumo} from './consumos/consumo';
import { ConsumoService } from './consumos/consumo.service';
import { format
 } from 'date-fns';
@Component({
  selector: 'app-telefonos',
  templateUrl: './telefonos.component.html',
  styleUrls: ['./telefonos.component.scss']
})

export class TelefonosComponent {
  



  telefonos: Telefono[] = [];

  //Consumos y chart
  consumoForm: FormGroup = new FormGroup({
    fecha: new FormControl('', [Validators.required]),
    consumo: new FormControl('', [Validators.required]),
    
  })
  loading = false;
  checkedConsumo: boolean[] = [];
  emptychart: boolean[] = [];
  consumosPorTelefono: Consumo[] = [];
  chartData = [{}];
  chartDataPromedioMaxMin = [{}];

  chartOptions = {
    plugins: {
      title: {
        display: true,
        text: 'Histórico',
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
  chartOptionsPromedioMaxMin = {
    plugins: {
      title: {
        
        display: true,
        text: 'Promedio',
        align: 'center',
        
        font: {
          size: 24,
          weight: 'bold'
        },
        padding: {
          top: 10,
          bottom: 10
        }

     },

    legend: {
      display: false, // Establece display en false para ocultar el legend
    },
  },
  tooltips: {
    callbacks: {
      label: function (tooltipItem:any) {
        return tooltipItem.yLabel;
      },
    },
  },

    
};
 

 

  cliente: Cliente = {
    id: 0, // Valor inicial para 'id'
    nombre: '', // Valor inicial para 'nombre'
    email: '',
    bio: '',
    nacimiento: new Date()
  };

 
  //Validator tld
  formTlf = new FormGroup({
    telefono: new FormControl('', [Validators.required, Validators.pattern("^[0-9]{9}$")] )
  })

  

  constructor(
   
    private telefonoService: TelefonoService,
    private consumoService: ConsumoService,
    public dialogConfig : DynamicDialogConfig,
    public messageService : MessageService,
  ) {}

  ngOnInit(): void {
    const clienteId = this.getParam();
    if (clienteId !== null) {
      this.getCliente(clienteId);
      this.getTelefonosList(clienteId);
      
    }
    
  }
  private getParam(){
   // return this.activatedRoute.snapshot.paramMap.get('clienteId');
   return this.dialogConfig.data.id;
  }

  getTelefonosList(id: string) {
    this.telefonoService.getTelefonosCliente(id).subscribe(
      (response: Telefono[]) => {
        console.log(response);
        this.telefonos = response;
        
      },
      (error) => {
        // Manejo de errores
        console.error('Error al obtener la lista de teléfonos:', error);
      }
      
    );
  }


 
  getCliente(id: string) {
    this.telefonoService.getCliente(id).subscribe(
      (response: Cliente) => {
        this.cliente = response;
        console.log(response);
      },
      (error) => {
        // Manejo de errores
        console.error('Error al obtener el cliente:', error);
      }
    );
  }

  borrarTelefono(id: string){
    this.telefonoService.deleteTelefono(id).subscribe(
      response => {
        console.log(response);

          //refresh
        const ClienteId = this.getParam()
        if  (ClienteId !== null){
          this.getTelefonosList(ClienteId);
        }

      
        this.messageService.add({
          severity: 'success',
          summary: 'Operación exitosa',
          detail: 'El telefono ha sido borrado correctamente.',
          key:'tlf',
      });
      
      
       
      }, (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Operación fallada',
          detail: 'El teléfono no ha sido borrado.' ,
          key:'tlf',
      });
      console.log(error);
      }
     
       
    )
   
  }
  crearTelefono( ){
    if (this.formTlf.valid && this.cliente.id !== undefined){
      const nuevoTelefono = this.formTlf.value.telefono as string
      console.log(nuevoTelefono);

      this.telefonoService.addTelefono(nuevoTelefono,this.cliente.id).subscribe(
        response =>{
          console.log(response);
            //refresh
        const ClienteId = this.getParam();
        if  (ClienteId !== null  ){
          this.getTelefonosList(ClienteId);
          this.messageService.add({
            severity: 'success',
            summary: 'Operación exitosa',
            detail: 'El número de telefono ha sido creado  correctamente.',
            key:'tlf',
        });
        }
        }, (error) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Operación fallada',
            detail: 'El teléfono no ha sido creado.' ,
            key:'tlf',
        });
        console.log(error);
        }
      )
    }else{
      this.messageService.add({
        severity: 'info',
        summary: 'Atención',
        detail: 'Escriba un número de teléfono válido: 9 dígitos sin espacios.', 
        key:'tlf',
    });
    }
   
   }

   private isValidTelephone(numero: string): boolean {
    return /^[0-9]{9}$/.test(numero);
   }

 
   editarTelefono(telefono: Telefono){
    
    if (this.isValidTelephone(telefono.numero)){
            
      this.telefonoService.editTelefono(telefono).subscribe(
        response =>{
              console.log(response);
              this.messageService.add({
                severity: 'success',
                summary: 'Operación exitosa',
                detail: 'Teléfono  editado  correctamente.',
                key:'tlf',
              });
              
        }, (error) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Operación fallada',
            detail: 'El teléfono no ha sido editado.' ,
            key:'tlf',
        });
        console.log(error);
      });  

     }else{
       this.messageService.add({
         severity: 'info',
         summary: 'Atención',
         detail: 'Teléfono no editado: Asegurese de que el telefono es válido.',
         key:'tlf',
     });
  }
   }

/*
---------------------------------CONSUMOS--------------------------------
*/
   getData(telefono: Telefono, indice: number) {
    //carga datos, en caso de que sean muchos
   this.loading = true;

    this.consumoService.getConsumosTelefono(telefono.id).subscribe(
      (response) => {
        if (response.length === 0){ // vacío, no hay chart
          this.emptychart.splice(indice,1,true);
          this.chartData.splice(indice, 1,[]);
          this.chartDataPromedioMaxMin.splice(indice, 1, []);

        }else{  //hay chart ya que hay consumos
          this.emptychart.splice(indice,1,false); 
          // Formatear las fechas y especificar los labels
          const formattedDates = response.map((consumo) => {
            return format(new Date(consumo.fecha), 'MMMM - yyyy',);
          });

          //genermoas un color random

          const backgroundColor = `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 0.2)`;
          const borderColor = `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 1)`;


          //data set de consumos
          const dataset = {
            labels: formattedDates,
            datasets: [
              {
                
                label: 'Consumos',
                data: response.map((consumo: Consumo) => consumo.consumo),
                borderColor: borderColor,
                borderWidth: 1,
               
              }
            ],
          
          } 
          
          //media, máximo y mínimo  
          const mediaValue = response.reduce((acc, consumo) => acc + consumo.consumo, 0) / response.length;
          const maxValue = Math.max(...response.map((consumo) => consumo.consumo));
          const minValue = Math.min(...response.map((consumo) => consumo.consumo));

          //data set de valores estadístico
          const dataset2 = {
            labels: ["Media", "Máximo", "Mínimo"],
            datasets: [
              {
                
                data: [mediaValue, maxValue, minValue],
                backgroundColor: backgroundColor,
                borderColor: borderColor,
                borderWidth: 1,
              },
          
            ],
            
          };
          
          this.chartData.splice(indice, 1, dataset);
          console.log(mediaValue, maxValue, minValue);
          this.chartDataPromedioMaxMin.splice(indice, 1, dataset2);
        }
        
        this.loading = false;
       
    });
   
}
crearConsumo(id: string) {
  /*
  this.consumoService.createConsumo(id).subscribe(
    (response: Consumo) => {
      console.log(response);
      this.getData(this.telefono, this.telefonos.length - 1);
    },
    (error) => {
      // Manejo de errores
      console.error('Error al crear el consumo:', error);
  
}
*/
}
}
