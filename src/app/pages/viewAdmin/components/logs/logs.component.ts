import { Component, OnInit } from '@angular/core';
import { LogsService } from 'src/app/services/logs/logs.service';
import { Log, Bloqueo } from 'src/app/models/log';
@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.css']
})
export class LogsComponent implements OnInit {

  selectedTable: 'Logs' | 'Bloqueos' = 'Logs';
  itemsDropdown = [
    { label: 'Logs', value: 'Logs' },
    { label: 'Bloqueos', value: 'Bloqueos' },
   
  ];
  elementsTable: Log[] | Bloqueo[] = [];
  
  constructor(private logService: LogsService) { }

  ngOnInit() {
   this.getLogs();
  }

  getLogs(){
    this.logService.verLogs().subscribe(
      response => {
        this.elementsTable = response;
      }
    )
  }

  getBloqueos(){
    this.logService.verBloqueos().subscribe(
      response => {
        this.elementsTable = response;
      }
    )
  }
  updateTable() {
   
    if(this.selectedTable === 'Logs'){
     
      this.getLogs();
    }else {
      this.getBloqueos();
    }
  }



}
