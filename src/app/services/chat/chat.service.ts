import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Conversacion, Mensaje } from 'src/app/models/mensaje'; 

@Injectable({
  providedIn: 'root',
})
export class ChatService {

  private idConversacion: number | undefined;

  urlOpenAI: string = 'http://localhost:3000/openai/';
  urlMensajes: string = 'http://localhost:3000/mensajes/';
  urlConversacion: string = 'http://localhost:3000/conversacion/';

  constructor(private http: HttpClient) {}

  setIdConversacion(id_conversacion: number) {
    this.idConversacion = id_conversacion;
    console.log ("ID conversacion: " + this.idConversacion);
  }

  getIdConversacion(): number | undefined {
    return this.idConversacion;
  }

  disconnect(): void{
    this.idConversacion = undefined;
  }
  agregarMensaje(prompt: string): Observable<string> {
    if (this.idConversacion === undefined) {
      return new Observable();
    }

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    const options = { 
      headers: headers,
    };

    const mensaje = {
      prompt: prompt,
      id_conversacion: this.idConversacion,
    }

    return this.http.post<string>(this.urlOpenAI, mensaje, options);
  }

  getMensajes(): Observable<Mensaje[]> {
    if (this.idConversacion === undefined) {
      return new Observable(); // Devuelve un observable vacío o maneja este caso adecuadamente
    }
    return this.http.get<Mensaje[]>(this.urlMensajes + this.idConversacion);
  }

  crearConversacion(id_user: number| undefined): Observable<Conversacion> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    const options = { 
      headers: headers,
    };
   
    if (id_user === undefined) {
      return this.http.post<Conversacion>(this.urlConversacion,  options)
    } else{
      return this.http.post<Conversacion>(this.urlConversacion,{id_user: id_user} , options)
    }
    
      
  }
}
