import { Component, Input,  OnInit, ViewChild, ElementRef  } from '@angular/core';
import { MensajeChat } from '../../models/mensaje';
import { Conversacion, Mensaje } from 'src/app/models/mensaje';
import { ChatService } from '../../../../services/chat/chat.service';
import { Usuario } from 'src/app/models/cliente';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  @Input() usuario: Usuario = {
    id: 0,
    email: '',
    password: '',
    id_perfil: 0
  };

  @ViewChild('scrollMe') private myScrollContainer!: ElementRef;

 


  nuevoMensaje: string = '';
  mensajeInsertar: string = '';

  mensajes: MensajeChat[] = [];
  cargandoRespuesta: boolean = false;

  constructor(private chatService: ChatService) { }

  ngOnInit(): void {
    this.iniciarConversacion();
  }

 
  private iniciarConversacion() {
    if (this.chatService.getIdConversacion() !== undefined) {
      console.log('El ID de la conversación es: ' + this.chatService.getIdConversacion());
      this.cargarMensajesPrevios();
    }
  }

  private cargarMensajesPrevios() {
    this.chatService.getMensajes()?.subscribe((mensajes: Mensaje[]) => {
      mensajes.forEach(m => this.agregarMensajeAConversacion(m));
      this.scrollDown();
    });
  }

  private agregarMensajeAConversacion(mensaje: Mensaje) {
    const fecha = this.formatTimeAgo(mensaje.timestamp);
    const nuevoMensaje: MensajeChat = { texto: mensaje.prompt, autor: this.usuario.email || 'Anónimo', timestamp:fecha };
    const respuestaGptMensaje: MensajeChat = { texto: mensaje.respuesta, autor: 'Gepeto', timestamp:fecha };
    this.mensajes.push(nuevoMensaje, respuestaGptMensaje);
  }

 async enviarMensaje() {
    if (this.nuevoMensaje.trim()) {
      this.mensajeInsertar = this.nuevoMensaje;
      this.nuevoMensaje = '';
      this.cargandoRespuesta = true;
    
      this.agregarNuevoMensaje();
      await this.enviarMensajeAlServidor();
      
    }
  }

  private async agregarNuevoMensaje() {
    const fecha = this.formatTimeAgo(new Date());
    const nuevoMensaje: MensajeChat = { texto: this.mensajeInsertar, autor: this.usuario.email || 'Anónimo', timestamp:fecha };
    this.mensajes.push(nuevoMensaje);
    this.scrollDown();
  
  }

  private async enviarMensajeAlServidor() {
    if (this.chatService.getIdConversacion() === undefined) {
      this.crearConversacion();
    } else{
      if (this.mensajeInsertar.trim() === '') {
        // Evitar enviar mensajes vacíos
        console.log("El mensaje está vacío. No se enviará.");
        this.cargandoRespuesta = false;
        return;
      }

      this.chatService.agregarMensaje(this.mensajeInsertar).subscribe(
        response => {
          this.procesarRespuestaServidor(response);
          this.mensajeInsertar  = '';
        },
        error => console.error('Error al enviar mensaje:', error)
      );
    }
    
  }

  private  crearConversacion() {
    console.log("user_id: " + this.usuario.id);
    const usuarioId = this.usuario.id || undefined;
    this.chatService.crearConversacion(usuarioId).subscribe(
      response => this.procesarCreacionConversacion(response),
      error => console.error('Error al crear la conversación:', error)
    );
  }

  private  procesarCreacionConversacion(response: Conversacion) {
    if (response && response.id) {
      console.log('Conversación creada correctamente con ID: ' + response.id);
      this.chatService.setIdConversacion(response.id);
      this.enviarMensajeAlServidor();
    } else {
      console.error('Error al crear la conversación');
    }
  }

  private  procesarRespuestaServidor(response: string) {
    const respuestaGpt: MensajeChat = { texto: response, autor: 'Gepeto', timestamp: this.formatTimeAgo(new Date()) };
    this.mensajes.push(respuestaGpt);
    this.scrollDown();
    this.cargandoRespuesta = false;
    
  }

  tieneImagen(texto: string): boolean {
    const matches = texto.match(/!\[.*?\]\(.*?\)/g);
    return matches ? matches.length > 0 : false;
  }
  
  extraerUrlsImagenes(texto: string): string[] {
    const regex = /\]\((.*?)\)/g;
    let matches;
    const urls = [];
  
    while (matches = regex.exec(texto)) {
      urls.push(matches[1]);
    }
  
    return urls;
  }
  
  extraerDescripcionesImagenes(texto: string): string[] {
    const regex = /!\[(.*?)\]/g;
    let matches;
    const descripciones = [];
  
    while (matches = regex.exec(texto)) {
      descripciones.push(matches[1]);
    }
  
    return descripciones;
  }
  
  textoSinImagen(texto: string): string {
    return texto.replace(/!\[.*?\]\(.*?\)/g, '');
  }


  formatTimeAgo(timestamp:Date) {
   
    if (!(timestamp instanceof Date)) {

      timestamp = new Date(timestamp);
    }
  
 
    return timestamp.toLocaleDateString() + ' ' + timestamp.toLocaleTimeString(); 
  }

  scrollDown(): void {
    try {
      this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch(err) { }    
  }

 
}


