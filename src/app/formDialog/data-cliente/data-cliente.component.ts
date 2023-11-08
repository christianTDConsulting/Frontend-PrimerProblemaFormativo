import { Component } from '@angular/core';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import {DynamicDialogRef} from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';


@Component({
  selector: 'app-data-cliente',
  templateUrl: './data-cliente.component.html',
  styleUrls: ['./data-cliente.component.scss']
})
export class DataClienteComponent {
 

 
  clienteId: any;
 


  constructor(

    public dialogConfig : DynamicDialogConfig,
    public messageService : MessageService,
    private ref: DynamicDialogRef,
   
  ) { }

  
  ngOnInit(): void {
   this.clienteId =  this.getParam();
   
  }
  //PRIVADOS

  private getParam(){
    return this.dialogConfig.data.id;
  }
   
   //El componente de calendario de primeNG, devuelve la hora del navegador en este caso Europa, por lo tanto, hago esta función para cambiar a GMT que es la fecha de la bbdd
  



 
  

   
   
     
}
