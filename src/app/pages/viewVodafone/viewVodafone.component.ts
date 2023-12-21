import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-viewVodafone',
  templateUrl: './viewVodafone.component.html',
  styleUrls: ['./viewVodafone.component.css'],
  
})
export class ViewVodafoneComponent implements OnInit {

  stateOptions: any[] = [{label: 'Comparación', value: 'c'}, {label: 'Huecos', value: 'h'}];
  value = 'c';

  constructor() { }

  ngOnInit() {
  }

}
