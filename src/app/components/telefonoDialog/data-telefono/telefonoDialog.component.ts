import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import {DynamicDialogRef} from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-telefonoDialog',
  templateUrl: './telefonoDialog.component.html',
  styleUrls: ['./telefonoDialog.component.css']
})
export class TelefonoDialogComponent implements OnInit {

  constructor( 
    public dialogConfig : DynamicDialogConfig,
    public messageService : MessageService,
    private ref: DynamicDialogRef,
    ) { }

  id_cliente: number = 0;

  ngOnInit() {
    this.id_cliente =  this.dialogConfig.data.id;
  }
}
