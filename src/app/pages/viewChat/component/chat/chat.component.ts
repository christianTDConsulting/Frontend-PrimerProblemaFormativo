import { Component, Input, ViewChild, ElementRef  } from '@angular/core';
import { Mensaje } from '../../models/mensaje';
import { ChatService } from '../../services/chat.service';
import { ScrollPanel } from 'primeng/scrollpanel';
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent   {


  @Input() username!: string;
  @ViewChild('scrollPanel') scrollPanel: ScrollPanel | undefined = undefined;
  @ViewChild('inputElement') inputElement: ElementRef | undefined = undefined;

  nuevoMensaje: string = '';
  mensajes: Mensaje[] = [];
  cargandoRespuesta: boolean = false;

  constructor(private chatService: ChatService) {
    this.mensajes = this.chatService.obtenerMensajes();
  }
  
  enviarMensaje() {
    
    if (this.nuevoMensaje.trim()) {

      const nuevoMensaje: Mensaje = { texto: this.nuevoMensaje, autor: this.username };
      this.chatService.agregarMensaje(nuevoMensaje);

      this.nuevoMensaje = '';
      this.focusAndScroll();
      // Desactivar input y botón mientras se carga la respuesta
      this.cargandoRespuesta = true;

      this.sendPrompt(nuevoMensaje.texto);
      this.focusAndScroll();

      this.cargandoRespuesta = false;
      // Aquí la lógica para obtener la respuesta del asistente...
      // Por ejemplo, simulando una respuesta asíncrona:
      
    }
  }

  sendPrompt(prompt: string) {
    setTimeout(() => {
      const respuesta: Mensaje = { texto: 'Respuesta del asistente', autor: 'Gepeto' };
      
      this.chatService.agregarMensaje(respuesta);
     
      
    }, 500);
  }
  focusAndScroll() {
    if (this.inputElement && this.inputElement.nativeElement) {
      this.inputElement.nativeElement.focus();
    }
  
    // Desplazar el scroll al final del scrollPanel
    if (this.scrollPanel &&   this.scrollPanel.containerViewChild?.nativeElement) {
      const container = this.scrollPanel.containerViewChild.nativeElement;
      container.scrollTop = container.scrollHeight;
    }
  }

}
