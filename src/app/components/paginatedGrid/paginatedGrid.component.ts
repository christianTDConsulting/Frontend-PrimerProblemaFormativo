import { Component, Input, OnInit } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';

export interface Modelo {
  url: string;
  timestamp: Date;
}

@Component({
  selector: 'app-paginatedGrid',
  templateUrl: './paginatedGrid.component.html',
  styleUrls: ['./paginatedGrid.component.css'],
  standalone:true,
  imports: [
    DialogModule,
    ButtonModule,
    CardModule,
  ],
  
})
export class PaginatedGridComponent implements OnInit {

  
  @Input() modelos: Modelo[] = [];
  @Input() contenidoDialogo: any; // Ajusta según sea necesario

  dialogVisibility: boolean = false;
  selectedModel: Modelo | undefined;

  constructor() { }

  ngOnInit(): void { }

  openDialog(modelo: Modelo): void {
    this.selectedModel = modelo;
    this.dialogVisibility = true;
  }

  onDialogClose(): void {
    this.dialogVisibility = false;
  }
}
