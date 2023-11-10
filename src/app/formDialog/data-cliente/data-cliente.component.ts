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
 

 
  clienteId: number = this.dialogConfig.data.id;
 


  constructor(

    public dialogConfig : DynamicDialogConfig,
    public messageService : MessageService,
    private ref: DynamicDialogRef,
   
  ) { }

  
  ngOnInit(): void {
  
   
  }
  cerrarDialog(event: any){
    this.ref.close();
  }
}
