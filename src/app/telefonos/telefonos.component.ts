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
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import {jsPDF, TableConfig} from 'jspdf';
import html2canvas from 'html2canvas';

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
  private destroy$: Subject<void> = new Subject<void>();
 
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
  //PDF
  
  doc = new jsPDF();
  //@ViewChildren('chart1') charts!: QueryList<ElementRef>;
  //chartImgArray: string[] = []; // Un array para almacenar las imágenes

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
    this.telefonoService.getTelefonosCliente(id).pipe(takeUntil(this.destroy$)).subscribe(
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
    this.telefonoService.deleteTelefono(id).pipe(takeUntil(this.destroy$)).subscribe(
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
    

      this.telefonoService.addTelefono(nuevoTelefono, this.cliente.id).pipe(takeUntil(this.destroy$)).subscribe(
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
      this.telefonoService.editTelefono(telefono).pipe(takeUntil(this.destroy$)).subscribe(
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
    this.loading = true; //Activa el loading
    if (telefono.id != null) { //Si existe no es null
      this.consumoService.getConsumosTelefono(telefono.id).pipe(takeUntil(this.destroy$)).subscribe( //OBTENGO LOS CONSUMOS DEL TELEFONO PARA INICIALIAR LOS CHART
        (response) => {
          if (response.length === 0) { //SI NO HAY CONSUMOS EN EL TELEFONO
            this.emptychart.splice(indice, 1, true); //Vacio
            this.chartData.splice(indice, 1, []); //Inicializa charts a vacío
            this.chartDataPromedioMaxMin.splice(indice, 1, []);
          } else { //SI HAY CONSUMOS
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

              const dataset =  {
                labels: formattedDates,
                datasets: [
                  {
                    label: 'Consumos',
                    data: response.map((consumo: Consumo) => consumo.consumo),
                    borderColor: borderColor,
                    borderWidth: 1,
                    tension: 0.4,
                  }
                ],
              };

              this.chartData.splice(indice, 1, dataset); //Inserto el chart 1 en el array de charts

              //CHART 2

              //PARA EL CHART 2 NECESITO MEDIA, MIN, MAX QUE OBTENGO DEL BACKEND
              this.consumoService.getMediaMaxMin(telefono.id).pipe(takeUntil(this.destroy$)).subscribe(
                (result) => {
                  const dataset2 = {
                    labels: ["Media", "Máximo", "Mínimo"],
                    datasets: [
                      {
                        data: [result[0].media, result[0].maximo, result[0].minimo],
                        backgroundColor: backgroundColor,
                        borderColor: borderColor,
                        borderWidth: 1,
                      },
                    ],
                  };

                  this.chartDataPromedioMaxMin.splice(indice, 1, dataset2); //Inserto el chart 2 en el array de charts
                }
              )
              
           


             

             
             
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
      
      this.consumoService.createConsumo(nuevoConsumo).pipe(takeUntil(this.destroy$)).subscribe(
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

  editarConsumo(consumo: Consumo, telefono: Telefono, index: number) {
    
    //Si se ha modificado la fecha, se convierte a UTC ya que el componente devuelve la hora del navegador
    this.consumoService.getConsumoById(consumo.id!).pipe(takeUntil(this.destroy$)).subscribe(
      response => {
        if (response.fecha !== consumo.fecha) {
          consumo.fecha = this.dateIsUTC(consumo.fecha);
        }
        //Se edita el consumo y toast
        this.consumoService.editConsumo(consumo).pipe(takeUntil(this.destroy$)).subscribe(
          result => {
            console.log(result);
            this.messageService.add({
              severity: 'success',
              summary: 'Operación exitosa',
              detail: 'Consumo editado correctamente.',
              key: 'tlf',
            });
           this.getData(telefono, index);
          },
          (error) =>  {
            this.messageService.add({
              severity: 'error',
              summary: 'Operación fallada',
              detail: 'El consumo no ha sido editado.',
              key: 'tlf',
            });
            console.log(error);
          }
        )
      }
    );
    
    
    
  }

  eliminarConsumo(id:number, telefono: Telefono, index:number){
    this.consumoService.deleteConsumo(id).pipe(takeUntil(this.destroy$)).subscribe(
      response => {
        console.log(response);
        this.messageService.add({
          severity: 'success',
          summary: 'Operación exitosa',
          detail: 'Consumo eliminado correctamente.',
          key: 'tlf',
        });
        this.getData(telefono, index);
      },
      (error) =>  {
        this.messageService.add({
          severity: 'error',
          summary: 'Operación fallada',
          detail: 'El consumo no ha sido eliminado.',
          key: 'tlf',
        });
        console.log(error);
      }
    )
  }

  
  //////////////////////////////////////////////////////////////
  //------------------MÉTODOS PDF-----------------------------//
  //////////////////////////////////////////////////////////////
  /*
  ngAfterViewInit() {
    this.charts.forEach((chart, i) => {
      html2canvas(chart.nativeElement).then(canvas => {
        this.chartImgArray[i] = canvas.toDataURL('image/png');
      });
    });
  }
*/
  async getChartImage(index:number)  {
       
  }

  async generatePDF(telefono:Telefono, index:number){
  console.log("Generando PDF...");
    this.doc.setFont("helvetica","bold"); //texto en negrita
    this.doc.text('Datos de consumo del teléfono '+telefono.numero, 20, 20); //titulo
 
    this.doc.setFont("helvetica","normal"); //texto normal

    const headers = ['Fecha', 'Consumo'];

    const options: TableConfig = {
       
    };
   
    const data = this.consumos[index].map(item => {
      // Formatear la fecha como MM/yyyy
      const formattedFecha =  format(new Date(item.fecha), 'MMMM - yyyy',);
      // Formatear el consumo como una cadena
      const formattedConsumo = item.consumo.toString();
      return {Fecha: formattedFecha, Consumo: formattedConsumo};
  });

    this.doc.table(70, 40, data, headers, options); //TABLA


    const chartImage =  await this.getChartImage(index);

    //this.doc.addImage(chartImage, 'PNG', 70, 60, 600,400, undefined, 'FAST') //CHAR 1

    this.doc.save(telefono.numero+'-Consumos.pdf'); //save
  }
  
}
