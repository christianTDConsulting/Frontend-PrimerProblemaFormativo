import { Component, OnInit } from '@angular/core';
import { Empresa } from '../../models/empresas';
import { EmpresaService } from 'src/app/services/empresa/empresa.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-viewEmpresasAtp',
  templateUrl: './viewEmpresasAtp.component.html',
  styleUrls: ['./viewEmpresasAtp.component.css']
})
export class ViewEmpresasAtpComponent implements OnInit {

  constructor(private empresaService: EmpresaService, private router: Router) { }

  empresas: Empresa[] = [ ]

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
