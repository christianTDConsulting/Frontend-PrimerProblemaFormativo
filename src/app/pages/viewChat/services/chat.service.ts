import { Injectable } from '@angular/core';
import { Mensaje } from '../models/mensaje';
@Injectable({
  providedIn: 'root',
})
export class ChatService {
  mensajes: Mensaje[] = [];

  agregarMensaje(mensaje: Mensaje) {
    this.mensajes.push(mensaje);
  }

  obtenerMensajes(): Mensaje[] {
    return this.mensajes;
  }
}
