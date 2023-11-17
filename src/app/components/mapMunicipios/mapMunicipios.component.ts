import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';


@Component({
  selector: 'app-map',
  templateUrl: './mapMunicipios.component.html',
  styleUrls: ['./mapMunicipios.component.css']
})
export class MapMunicipiosComponent implements OnInit {

  private map:any;
  
  constructor() { }

  ngOnInit() {
    this.initMap();
    this.map.invalidateSize();
  }

  private initMap(): void {
    this.map = L.map('map').setView([40.416775, -3.70379], 6);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(this.map);
  }
 


}
