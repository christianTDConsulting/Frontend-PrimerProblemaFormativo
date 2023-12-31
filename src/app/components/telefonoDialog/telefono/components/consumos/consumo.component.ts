
import { Component, OnInit, Input, ViewChild,ElementRef } from '@angular/core';
import { TelefonoService } from '../../../../../services/telefono/telefono.service';
import { Telefono } from '../../../../../models/telefono';
import { Usuario } from 'src/app/models/cliente';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';
import { FormControl, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Consumo } from '../../../../../models/consumo';
import { ConsumoService } from '../../../../../services/consumo/consumo.service';
import { format } from 'date-fns';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import {jsPDF, TableConfig} from 'jspdf';
import html2canvas from 'html2canvas';
import {MailerService} from '../../../../../services/mailer/mailer.service';
import { Buffer } from 'buffer';
import { ClienteService } from 'src/app/services/cliente/cliente.service';



@Component({
  selector: 'app-consumo',
  templateUrl: './consumo.component.html',
  styleUrls: ['./consumo.component.css']
})

export class ConsumoComponent implements OnInit {

  //TELEFONO
  @Input() telefono!: Telefono;
 
  
  private destroy$: Subject<void> = new Subject<void>();

   //PDF
  
   doc = new jsPDF();
 
   
 
   // CONSUMOS Y CHART
   consumoForm: FormGroup = new FormGroup({
     fecha: new FormControl('', [Validators.required]),
     consumo: new FormControl('', [Validators.required]),
   });
   
   loading = false;
   checkedConsumo: boolean = false;
  opcionesSelectButton = [{label: 'Tabla', value: true}, {label: 'Gráfica', value: false}];
   emptychart: boolean = true;
   consumosPorTelefono: Consumo[] = [];
   chartData = {};
   chartDataPromedioMaxMin = {};
   consumos: Consumo[] = [];
 
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

  constructor(
    private telefonoService: TelefonoService,
    private consumoService: ConsumoService,
    private mailerService: MailerService,
    private clienteService: ClienteService,
    public dialogConfig: DynamicDialogConfig,
    public messageService: MessageService,

    
  ) { }

  ngOnInit() {
  }

   //////////////////////////////////////////////////////////////
  //------------------MÉTODOS CONSUMOS -----------------------//
  //////////////////////////////////////////////////////////////

 
   
  getData(telefono: Telefono) {
    this.loading = true; //Activa el loading
    if (telefono.id != null) { //Si existe no es null
      this.consumoService.getConsumosTelefono(telefono.id).pipe(takeUntil(this.destroy$)).subscribe( //OBTENGO LOS CONSUMOS DEL TELEFONO PARA INICIALIAR LOS CHART
        (response) => {
          if (response.length === 0) { //SI NO HAY CONSUMOS EN EL TELEFONO
            this.emptychart = true; //Vacio
            this.chartData = [] ;//Inicializa charts a vacío
            this.chartDataPromedioMaxMin = [];

          } else { //SI HAY CONSUMOS
            this.emptychart = false; //No Está vacío
            //Inicializa consumos para mostrar en la tabla
            this.consumos = response; 
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

              this.chartData = dataset; //Inserto el chart 1 en el array de charts

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

                  this.chartDataPromedioMaxMin = dataset2; //Inserto el chart 2 en el array de charts
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


  crearConsumo(telefono:Telefono) {
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
          this.getData(telefono);
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

  editarConsumo(consumo: Consumo, telefono: Telefono) {
    
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
           this.getData(telefono);
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

  eliminarConsumo(id:number, telefono: Telefono){
    this.consumoService.deleteConsumo(id).pipe(takeUntil(this.destroy$)).subscribe(
      response => {
        console.log(response);
        this.messageService.add({
          severity: 'success',
          summary: 'Operación exitosa',
          detail: 'Consumo eliminado correctamente.',
          key: 'tlf',
        });
        this.getData(telefono);
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

 


  
  generatePDF(telefono:Telefono, download: boolean){
         
    console.log("Generando PDF...");
    
    if (this.consumos.length!== 0){
    this.checkedConsumo = false; 
    
    //REINICIAR PDF
      this.doc =  new jsPDF();
    //TITULO
      this.doc.setFont("helvetica","bold"); //texto en negrita
      this.doc.text('Datos de consumo del teléfono '+telefono.numero, 20, 20); //titulo
  
      this.doc.setFont("helvetica","normal"); //texto normal

    //TABLA
      const headers = ['Fecha', 'Consumo'];

      const options: TableConfig = {
        
      };
      
      const data = this.consumos.map(item => {
        // Formatear la fecha como MM/yyyy
        const formattedFecha =  format(new Date(item.fecha), 'MMMM - yyyy',);
        // Formatear el consumo como una cadena
        const formattedConsumo = item.consumo.toString();
        return {Fecha: formattedFecha, Consumo: formattedConsumo};
    });

      this.doc.table(70, 40, data, headers, options); //insertar tabla
    //GRAFICOS
    
      
    
      setTimeout(() => {
        const elemento = document.getElementById('chart'); 
    
        if(elemento){
    
          html2canvas(elemento).then(canvas => {
            const imgData = canvas.toDataURL('image/png');
            const imgProps = this.doc.getImageProperties(imgData);
            const pdfWidth = this.doc.internal.pageSize.getWidth();
            const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
            this.doc.addPage();
            this.doc.addImage(imgData, 'PNG', 0, 20, pdfWidth, pdfHeight, '', 'SLOW');
            //SI SE QUIERE DESCARGAR EL PDF
            if (download){
              this.doc.save(telefono.numero+'-Consumos.pdf'); //save


              this.messageService.add({
                severity: 'success',
                summary: 'Operación exitosa',
                detail: 'PDF generado correctamente.',
                key: 'tlf',
              });
            //SI SE QUIERE ENVIAR EL CORREO
            }else{

              this.generarCorreo(telefono);
            }
          });
            
            
    
        } else {
          console.error('Elemento  no encontrado.');
        }

      }, 500); // A timeout
      
    
  } else{
    this.messageService.add({
      severity: 'info',
      summary: 'Atención',
      detail: 'No hay datos para exportar',
      key: 'tlf',
    });
  }
}
  //////////////////////////////////////////////////////////////
  //------------------MÉTODOS CORREO--------------------------//
  //////////////////////////////////////////////////////////////
 
  generarCorreo(telefono: Telefono) {
    this.telefonoService.getClienteFromTlf(telefono.id).pipe(takeUntil(this.destroy$)).subscribe(
      response => { //Obtengo el cliente del tele
         this.clienteService.getUsuarioPorId(response.id_usuario).pipe(takeUntil(this.destroy$)).subscribe(
           usuario => {
              this.enviarCorreo(usuario.email);
            });
      });

  }
  
  enviarCorreo(email: string) {
    // Obtener el correo  a partir del ID del teléfono

               
    console.log(email);

    // Generar un PDF con los datos del consumo del teléfono
    

    // Obtener el contenido binario del PDF como un ArrayBuffer
    const binary = this.doc.output('arraybuffer');

    // Convertir el contenido binario del PDF a una cadena base64
    const pdfOutput = binary ? Buffer.from(binary).toString('base64') : '';

    // Enviar el correo con el PDF adjunto
    this.mailerService.sendMail(email, pdfOutput).pipe(takeUntil(this.destroy$)).subscribe(
      res => {
        // Imprimir la respuesta del servicio de correo en la consola
        console.log(res);
        // Mostrar un mensaje de éxito en la interfaz de usuario
        this.messageService.add({
          severity: 'success',
          summary: 'Operación exitosa',
          detail: 'Correo enviado correctamente, mire su bandeja de entrada.',
          key: 'tlf',
        });
      },
      (error) => {
        // Manejar errores de envío de correo
        console.log(error);
        // Mostrar un mensaje de error en la interfaz de usuario
        this.messageService.add({
          severity: 'error',
          summary: 'Operación fallada',
          detail: 'El correo no ha sido enviado.',
          key: 'tlf',
        });
      }

    );
  
      
     
  }
  

}