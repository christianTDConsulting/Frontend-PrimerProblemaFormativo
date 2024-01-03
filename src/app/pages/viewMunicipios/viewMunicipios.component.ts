import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DetallePrediccion, Municipio } from 'src/app/models/municipio';
import { MetereologiaService } from 'src/app/services/metereologia/metereologia.service';
import { CustomMenuItem } from './models/customMenu'; 


@Component({
  selector: 'app-viewMunicipios',
  templateUrl: './viewMunicipios.component.html',
  styleUrls: ['./viewMunicipios.component.css']
})



export class ViewMunicipiosComponent implements OnInit {

  constructor(
    private router: Router,
    private metereologiaService: MetereologiaService
    
    ) { }
  metereologias: Municipio[] = [];

  detalles: DetallePrediccion[] = [];

  menuItemsDetalle: CustomMenuItem[] = [
    {label: 'Resumen', code: ['resumen']},
    { label: 'Precipitacion', code: ['probPrecipitacion']},
    { label: 'Temperatura', code: ['temperatura', 'temperatura_maxima', 'temperatura_minima']},
    { label: 'Estado de cielo', code: ['estadoCielo']}, 
    { label: 'Viento', code: ['viento', 'rachaMax']},
    { label: 'Cota Nieve provincial', code: ['cotaNieveProv']},

    {label: 'Humedad relativa', code: ['humedad_relativa', 'humedad_relativa_minima', 'humedad_relativa_maxima']},
  ];

  activeMenuItemDetalle = this.menuItemsDetalle[0];
  provinciasDropDown : {name:string, code:string}[] = [{name: 'initial', code: 'i'}];
  
 
  selectedProvincias: string = '';

  municipiosDropDown : {name:string, code:string} [] = [{name: '', code: 'i'}];
  selectedMunicipios: string = '';



 

// Obtener la fecha actual
 currentDate = new Date();

// Crear un array con los próximos cuatro días
 dias = [
  {
    label: this.currentDate.toLocaleDateString(),
  },
  {
    label: this.getNextDate(this.currentDate, 1).toLocaleDateString(),
  },
  {
    label: this.getNextDate(this.currentDate, 2).toLocaleDateString(),
  },
  {
    label: this.getNextDate(this.currentDate, 3).toLocaleDateString(),
  }
];

  activeIndexDate:number = 0;



  ngOnInit() {
   this.initLabels();
  }

  goToLogin(){
    this.router.navigate(['/viewLogin']);
  }

  initLabels(){
    this.metereologiaService.getMunicipios().subscribe(
      response => {
        this.metereologias = response;
        for (const municipio of response){
          const exists = this.provinciasDropDown.some(item => item.name === municipio.provincia);
           // Si no existe, hacer push
          if (!exists && municipio.id !== undefined) {
            const codigoProvincia = municipio.id.toString().substring(0, 2);
            this.provinciasDropDown.push(
              { name: municipio.provincia, code: codigoProvincia }
            );
          }
          if (this.provinciasDropDown.length > 1){

            this.provinciasDropDown = this.provinciasDropDown.filter(item =>
                !(item['name'] === 'initial' && item['code'] === 'i')
              );

          }

          

        }
      }
    );
  }


  updateProvincias(event: any) {
    this.selectedProvincias = event.value.code;
    this.updateMunicipiosLabels();
  }

  updateMunicipiosLabels(){
    this.municipiosDropDown = [{name: '', code: 'i'}];
    for (const metereologia of this.metereologias){
      if (metereologia.id!== undefined){
        const codigoMunicipio = metereologia.id.toString().substring(0, 2);
      
        if ( codigoMunicipio === this.selectedProvincias){ 
        
          const exists = this.municipiosDropDown.some(item => item.name === metereologia.nombre);
          // Si no existe, hacer push
          if (!exists && metereologia.id !== undefined) {
            this.municipiosDropDown.push(
              { name: metereologia.nombre, code: metereologia.id }
            );
          }

          if (this.municipiosDropDown.length > 1){

            this.municipiosDropDown  = this.municipiosDropDown .filter(item =>
                !(item['name'] === '' && item['code'] === 'i')
              );

          }

        }
      }
    }
  }

 updateMunicipio(event: any) {
    this.selectedMunicipios = event.value.code;
    this.getDetallePrediccion();
  }

  getNombreMunicipio(){
    if (!this.metereologias || !this.selectedMunicipios) {
      return ''; 
    }
    const municipio = this.metereologias.find(m => m.id === this.selectedMunicipios);
    return municipio ? municipio.nombre : '';
  }

  updateDetalleCategory(event: any) {
    this.activeMenuItemDetalle = event;
    this.getDetallePrediccion();
  }
  updateDate(event: number) {
    this.activeIndexDate = event;
    this.getDetallePrediccion();
  }
  parseFecha(fecha: string): string{
 
    let partes = fecha.split('/');
  
   
    let dia = partes[0].length === 1 ? '0' + partes[0] : partes[0];
    let mes = partes[1].length === 1 ? '0' + partes[1] : partes[1];
    let año = partes[2];
  
    // Ajusta el año si es necesario
    if (año.length === 3) {
      año = '2' + año;
    }
  
    return dia +   mes +   año;
    
    
  }

  getDetallePrediccion(){
    if (this.selectedMunicipios !== '' ){
      this.detalles = [];
  
        const fecha = this.dias[this.activeIndexDate].label;
        const fechaParseada:string = this.parseFecha(fecha);
        const codigoMunicipio = this.selectedMunicipios;
        const categoryName = this.activeMenuItemDetalle.code;
        console.log(
          "fecha: " + fechaParseada,
          "municipio: "+ codigoMunicipio,
          "nombre de caregoría: "+ categoryName
        );
        
        if (categoryName[0] === 'resumen'){
          this.metereologiaService.getDetallesByMunicipioCodeAndDate(codigoMunicipio, fechaParseada).subscribe(
            response => {
              console.log(response);
              this.detalles = response;
            }
          );
          
        }else{
          categoryName.forEach(name => {
         
            this.metereologiaService.getDetallesByMunicipioCodeAndDateAndCategory(codigoMunicipio, fechaParseada, name).subscribe(
              response => {
                
                this.detalles = this.detalles.concat(response);
  
              }
            );
          });
        }
        
      }
       
  }
  
  

  getNextDate(date: Date, daysToAdd: number): Date {
    const newDate = new Date(date);
    newDate.setDate(date.getDate() + daysToAdd);
    return newDate;
  }
  

}

