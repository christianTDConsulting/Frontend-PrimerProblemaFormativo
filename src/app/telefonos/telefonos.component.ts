import { Component } from '@angular/core';
import { TelefonoService } from './telefono.service';
import { Telefono } from './telefono';
import { Cliente } from '../clientes/cliente';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';
import { FormControl, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Consumo } from './consumos/consumo';
import { ConsumoService } from './consumos/consumo.service';
import { format } from 'date-fns';

@Component({
  selector: 'app-telefonos',
  templateUrl: './telefonos.component.html',
  styleUrls: ['./telefonos.component.scss']
})

export class TelefonosComponent {
  //////////////////////////////////////////////////////////////
  //------------------CONSTANTES GLOBALES---------------------//
  //////////////////////////////////////////////////////////////

  telefonos: Telefono[] = [];

  // CONSUMOS Y CHART
  consumoForm: FormGroup = new FormGroup({
    fecha: new FormControl('', [Validators.required]),
    consumo: new FormControl('', [Validators.required]),
  });
  loading = false;
  checkedConsumo: boolean[] = [];
  emptychart: boolean[] = [];
  consumosPorTelefono: Consumo[] = [];
  chartData = [{}];
  chartDataPromedioMaxMin = [{}];
  consumos: Consumo[][] = [];

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
        display: false,
      },
    },
    tooltips: {
      callbacks: {
        label: function (tooltipItem: any) {
          return tooltipItem.yLabel;
        },
      },
    },
  };

  cliente: Cliente = {
    id: 0,
    nombre: '',
    email: '',
    bio: '',
    nacimiento: new Date()
  };

  // Validator tld
  formTlf = new FormGroup({
    telefono: new FormControl('', [Validators.required, Validators.pattern("^[0-9]{9}$")])
  });
  //////////////////////////////////////////////////////////////
  //------------------CONSTRUCTOR-----------------------------//
  //////////////////////////////////////////////////////////////
  constructor(
    private telefonoService: TelefonoService,
    private consumoService: ConsumoService,
    public dialogConfig: DynamicDialogConfig,
    public messageService: MessageService,
  ) {}
  //////////////////////////////////////////////////////////////
  //------------------MÉTODOS TELEFONO------------------------//
  //////////////////////////////////////////////////////////////
  ngOnInit(): void {
    const clienteId:number = this.getParam();
    if (clienteId !== null) {
      this.getCliente(clienteId);
      this.getTelefonosList(clienteId);
    }
  }

  private getParam() {
    return this.dialogConfig.data.id;
  }

  getTelefonosList(id: number) {
    this.telefonoService.getTelefonosCliente(id).subscribe(
      (response: Telefono[]) => {
        console.log(response);
        this.telefonos = response;
      },
      (error) => {
        console.error('Error al obtener la lista de teléfonos:', error);
      }
    );
  }

  getCliente(id: number) {
    this.telefonoService.getCliente(id).subscribe(
      (response: Cliente) => {
        this.cliente = response;
        console.log(response);
      },
      (error) => {
        console.error('Error al obtener el cliente:', error);
      }
    );
  }

  borrarTelefono(id: number) {
    this.telefonoService.deleteTelefono(id).subscribe(
      response => {
        console.log(response);
        const ClienteId = this.getParam()
        if (ClienteId !== null) {
          this.getTelefonosList(ClienteId);
        }

        this.messageService.add({
          severity: 'success',
          summary: 'Operación exitosa',
          detail: 'El telefono ha sido borrado correctamente.',
          key: 'tlf',
        });
      },
      (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Operación fallada',
          detail: 'El teléfono no ha sido borrado.',
          key: 'tlf',
        });
        console.log(error);
      }
    );
  }

  crearTelefono() {
    if (this.formTlf.valid && this.cliente.id !== undefined) {
      const nuevoTelefono = this.formTlf.value.telefono as string;
      console.log(nuevoTelefono);
    

      this.telefonoService.addTelefono(nuevoTelefono, this.cliente.id).subscribe(
        response => {
          console.log(response);
          const ClienteId = this.getParam();
          if (ClienteId !== null) {
            this.getTelefonosList(ClienteId);
            this.messageService.add({
              severity: 'success',
              summary: 'Operación exitosa',
              detail: 'El número de telefono ha sido creado correctamente.',
              key: 'tlf',
            });
          }
        },
        (error) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Operación fallada',
            detail: 'El teléfono no ha sido creado.',
            key: 'tlf',
          });
          console.log(error);
        }
      );
    } else {
      this.messageService.add({
        severity: 'info',
        summary: 'Atención',
        detail: 'Escriba un número de teléfono válido: 9 dígitos sin espacios.',
        key: 'tlf',
      });
    }
  }

  private isValidTelephone(numero: string): boolean {
    return /^[0-9]{9}$/.test(numero);
  }

  editarTelefono(telefono: Telefono) {
    if (this.isValidTelephone(telefono.numero)) {
      this.telefonoService.editTelefono(telefono).subscribe(
        response => {
          console.log(response);
          this.messageService.add({
            severity: 'success',
            summary: 'Operación exitosa',
            detail: 'Teléfono editado correctamente.',
            key: 'tlf',
          });
        },
        (error) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Operación fallada',
            detail: 'El teléfono no ha sido editado.',
            key: 'tlf',
          });
          console.log(error);
        });
    } else {
      this.messageService.add({
        severity: 'info',
        summary: 'Atención',
        detail: 'Teléfono no editado: Asegúrese de que el teléfono es válido.',
        key: 'tlf',
      });
    }
  }

  //////////////////////////////////////////////////////////////
  //------------------MÉTODOS CONSUMOS -----------------------//
  //////////////////////////////////////////////////////////////

  getData(telefono: Telefono, indice: number) {
    this.loading = true;
    if (telefono.id != null) {
      this.consumoService.getConsumosTelefono(telefono.id).subscribe(
        (response) => {
          if (response.length === 0) {
            this.emptychart.splice(indice, 1, true); //Vacio
            this.chartData.splice(indice, 1, []); //Inicializa charts a vacío
            this.chartDataPromedioMaxMin.splice(indice, 1, []);
          } else {
            this.emptychart.splice(indice, 1, false); //No Está vacío
            //Inicializa consumos para mostrar en la tabla
            this.consumos.splice(indice, 1, response); 
            //Inicializa charts con los datos

            //CHART 1
              const formattedDates = response.map((consumo) => {
                return format(new Date(consumo.fecha), 'MMMM - yyyy',);
              });

              const backgroundColor = `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 0.2)`;
              const borderColor = `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 1)`;

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
              };
              //CHART 2

              //cambiar a backend
              const mediaValue = response.reduce((acc, consumo) => acc + consumo.consumo, 0) / response.length;
              const maxValue = Math.max(...response.map((consumo) => consumo.consumo));
              const minValue = Math.min(...response.map((consumo) => consumo.consumo));

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
              this.chartDataPromedioMaxMin.splice(indice, 1, dataset2);
            }

          this.loading = false; //Datos cargados
        });
    }
  }

  private dateIsUTC (fecha:Date): Date {
    // Verifica si la fecha tiene una zona horaria GMT
    if (fecha.toTimeString().includes('Z')) {
      // La fecha ya tiene una zona horaria GMT, no es necesario hacer nada
      return fecha;
    } else  {

      const utcDate = new Date(fecha);
      utcDate.setMinutes(utcDate.getMinutes() - fecha.getTimezoneOffset());
      
      return utcDate;
    }
  }


  crearConsumo(telefono:Telefono, index:number) {
    if (this.consumoForm.valid){
      const {fecha, consumo} = this.consumoForm.value;
      
      const nuevoConsumo: Consumo = {
        fecha: this.dateIsUTC(fecha),
        consumo: consumo,
        id_telefono: telefono.id,
      }
      
      this.consumoService.createConsumo(nuevoConsumo).subscribe(
        (response) => {
          console.log(response);
          this.messageService.add({
            severity: 'success',
            summary: 'Operación exitosa',
            detail: 'Consumo creado correctamente.',
            key: 'tlf',
          });
          this.getData(telefono, index);
        },
        (error) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Operación fallada',
            detail: 'El consumo no ha sido creado.',
            key: 'tlf',
          });
          console.log(error);
        }
      );
    }else{
      this.messageService.add({
        severity: 'info',
        summary: 'Atención',
        detail: 'No ha sido creado: Asegurate de que los datos sean correctos.',
        key: 'tlf',
      });
    }
   
    
   
  }

  editarConsumo(consumo: Consumo, telefono: Telefono){
    this.consumoService.editConsumo(consumo).subscribe(
      response => {
        console.log(response);
        this.messageService.add({
          severity: 'success',
          summary: 'Operación exitosa',
          detail: 'Consumo editado correctamente.',
          key: 'tlf',
        });
       
      }
    )
  }

  eliminarConsumo(id:number){

  }
  
}
