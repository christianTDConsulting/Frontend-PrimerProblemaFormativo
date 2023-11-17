import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Municipio, DetallePrediccion } from 'src/app/models/municipio';


@Injectable({
  providedIn: 'root'
})
export class MetereologiaService {

  constructor(private http: HttpClient) { }
  urlAemet = 'https://opendata.aemet.es/opendata'
  backendUrl = 'http://localhost:3000/'

  getMunicipio(codigoMunicipio: string): Observable<Municipio> {

    return this.http.get<Municipio>(`${this.backendUrl}municipios/${codigoMunicipio}`);
  }

  getDetallesByMunicipioCode(codigoMunicipio: string): Observable<DetallePrediccion[]> {
    return this.http.get<DetallePrediccion[]>(`${this.backendUrl}detalles/${codigoMunicipio}`);
  }

  getDetallesByMunicipioCodeAndDate(codigoMunicipio: string, fecha: string): Observable<DetallePrediccion[]> {
    return this.http.get<DetallePrediccion[]>(`${this.backendUrl}detalles/${codigoMunicipio}/${fecha}`);
  }

  getDetallesByCategoryNameAndMunicipioCode(codigoMunicipio: string, categoryName: string): Observable<DetallePrediccion[]> {
    return this.http.get<DetallePrediccion[]>(`${this.backendUrl}detalles/${codigoMunicipio}/name/${categoryName}`);
  }
    

}
