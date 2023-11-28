import { Component, OnInit, ViewChild } from '@angular/core';
import { Empresa } from '../../models/empresas';
import { EmpresaService } from 'src/app/services/empresa/empresa.service';
import { Router } from '@angular/router';
import { Table } from 'primeng/table';
@Component({
  selector: 'app-viewEmpresasAtp',
  templateUrl: './viewEmpresasAtp.component.html',
  styleUrls: ['./viewEmpresasAtp.component.css']
})
export class ViewEmpresasAtpComponent implements OnInit {

  constructor(private empresaService: EmpresaService, private router: Router) { }
  @ViewChild('table') table!: Table;

  empresas: Empresa[] = [ ]
  zonasGeograficas: { label: string; value: string }[] = [
    'Canarias',
    'Madrid',
    'Castilla-la mancha',
    'Aragón',
    'Castilla y león',
    'Comunidad valenciana',
    'Murcia',
    'Catalunia',
    'Galicia',
    'Islas baleares',
    'Asturias',
    'Pais Vasco',
    'Navarra',
    'Cantabria',
    'Sur',
  ].map((label) => ({ label, value: label }));

   tipoActividad: { label: string; value: string }[] = [
    'AGRICULTURA Y PESCA',
    'SERVICIOS',
    'TURISMO-HOSTELERIA-OCIO-COMERCIO',
    'TELECOMUNICACIONES Y TECNOLOGÍA',
    'SECTOR PUBLICO',
    'Tipo de actividad',
    'ORGANIZACIONES, ASOCIACIONES Y FUNDACIONES',
    'EDUCACIÓN - FORMACIÓN',
    'ALIMENTACIÓN - DISTRIBUCIÓN',
    'AUTOMOCION Y COMPONENTES',
    'COMUNICACIÓN',
    'CONSULTORÍAS - ASESORÍAS JURÍDICAS',
    'ENERGIA Y TRANSPORTE',
    'FINANCIERO-PENSIONES-INVERSIONES-SEGUROS',
    'INDUSTRIA',
    'CONSTRUCCIÓN E INMOBILIARIO',
  ].map((label) => ({ label, value: label }));


  numEmpleados: { label: string; value: string }[] = [
    'Nº de empleados',
    'DE 1 A 25',
    'DE 26 A 50',
    'DE 51 A 100',
    'DE 101 A 250',
    'DE 251 A 1000',
    '+ DE 1000',
  ].map((label) => ({ label, value: label }));

  ngOnInit() {
    this.initEmpresas()
  }

  initEmpresas(){
    this.empresaService.getEmpresas().subscribe(
      res => {
        console.log(res);
        this.empresas = res;
      }
    )
  }

  goToLogin(){
    this.router.navigate(['/viewLogin']);
  }


}
