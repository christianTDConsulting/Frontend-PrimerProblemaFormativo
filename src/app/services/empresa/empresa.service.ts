import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Empresa } from 'src/app/models/empresas';
@Injectable({
  providedIn: 'root'
})
export class EmpresaService {

  url: string = 'http://localhost:3000/empresas_asociadas/';
constructor(private http: HttpClient) { }

getEmpresas(): Observable<Empresa[]>{
  return  this.http.get<Empresa[]>(this.url);
}
}
