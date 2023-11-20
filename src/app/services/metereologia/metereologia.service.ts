import { Injectable } from '@angular/core';
import { Observable , forkJoin,mergeMap, switchMap } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Municipio, DetallePrediccion } from 'src/app/models/municipio';
;

@Injectable({
  providedIn: 'root'
})
export class MetereologiaService {

  constructor(private http: HttpClient) { }
  urlAemet = 'https://opendata.aemet.es/opendata'
  backendUrl = 'http://localhost:3000/'

  addOrUpdateInfoMunicipio(codigoMunicipio: string) {
    const body = {
      codigoMunicipio: codigoMunicipio
    };

    // Define las cabeceras de la solicitud, si es necesario
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
  
    const options = { 
      headers: headers,
    };
    return this.http.post<any>(this.backendUrl, body, options);
  }
  getMunicipioInfo(codigoMunicipio: string): Observable<Municipio> {
    return this.http.get<Municipio>(`${this.backendUrl}municipios/${codigoMunicipio}`);
  }
  getMunicipios (): Observable<Municipio[]> {
    return this.http.get<Municipio[]>(`${this.backendUrl}municipios`);
  }

  getDetallesByMunicipioCodeAndDateAndCategory(codigoMunicipio: string, fecha: string, categoryName: string[]): Observable<DetallePrediccion[]> {
    const observablesArray: Observable<DetallePrediccion[]>[] = [];

    // Por cada categoría, crear una llamada HTTP y añadir la observable al array
    categoryName.forEach(category => {
      const url = `${this.backendUrl}detalles/${codigoMunicipio}/${fecha}/${category}`;
      const observable = this.http.get<DetallePrediccion[]>(url);
      observablesArray.push(observable);
    });

   // Usar forkJoin para combinar todas las observables en un array de arrays
  return forkJoin(observablesArray).pipe(
    // Utilizar mergeMap para aplanar el array de arrays a un solo array
    mergeMap(results => results)
  );
  }
  

  addOrUpdateAndGetMunicipioInfo(codigoMunicipio: string): Observable<Municipio> {
    // Llama a la función para añadir o actualizar la información
    return this.addOrUpdateInfoMunicipio(codigoMunicipio).pipe(
      // Cuando la solicitud anterior se complete, realiza la solicitud para obtener la información actualizada
      switchMap(() => this.getMunicipioInfo(codigoMunicipio))
    );
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
