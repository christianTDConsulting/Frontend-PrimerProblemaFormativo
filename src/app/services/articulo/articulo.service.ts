import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Articulo } from 'src/app/models/articulos';
@Injectable({
  providedIn: 'root'
})
export class ArticuloService {

  url: string = 'http://localhost:3000/articulos/';
  constructor(private http: HttpClient) { } 

  getArticulos(): Observable<Articulo[]> {
    try{
      return this.http.get<Articulo[]>(this.url);
    } catch(error){
      console.log(error);
      throw error;
    }
    
  }

}
