import { Component, ElementRef, Input,  OnInit, ViewChild } from '@angular/core';
import { MensajeChat } from '../../models/mensaje';
import { Conversacion, Mensaje } from 'src/app/models/mensaje';
import { ChatService } from '../../../../services/chat/chat.service';
import { Usuario } from 'src/app/models/cliente';
import { DomSanitizer } from '@angular/platform-browser';
import { Subject  } from 'rxjs';
import { ChangeDetectorRef } from '@angular/core';
import { MessageService } from 'primeng/api';
import { UploadEvent } from 'primeng/fileupload';

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
  @ViewChild('messageInput') private messageInputField!: ElementRef;
  emojiInput$ = new Subject<string>();
  

  nuevoMensaje: string = '';
  mensajeInsertar: string = '';

  mensajes: MensajeChat[] = [];
  cargandoRespuesta: boolean = false;

  images: any[] = [];
  responsiveOptions: any[] =  [
    {
      breakpoint: '1024px', // Para pantallas grandes como laptops y desktops
      numVisible: 5, // Muestra 5 imágenes a la vez
      numScroll: 3  // Desplaza 3 imágenes con cada acción
    },
    {
      breakpoint: '768px', // Para tablets y pantallas más pequeñas
      numVisible: 3, // Muestra 3 imágenes a la vez
      numScroll: 2  // Desplaza 2 imágenes con cada acción
    },
    {
      breakpoint: '560px', // Para teléfonos móviles y pantallas muy pequeñas
      numVisible: 1, // Muestra solo 1 imagen a la vez
      numScroll: 1  // Desplaza 1 imagen con cada acción
    }
  ];
  displayBasic: boolean = false;

  constructor(
    private chatService: ChatService,
    private sanitizer: DomSanitizer,
     private cdr: ChangeDetectorRef,
      private messageService: MessageService) { }

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
      setTimeout(() => this.scrollDown(), 0)
     
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
      this.cdr.detectChanges();
      this.scrollDown();
      
    }
  }

  private async agregarNuevoMensaje() {
    const fecha = this.formatTimeAgo(new Date());
    const nuevoMensaje: MensajeChat = { texto: this.mensajeInsertar, autor: this.usuario.email || 'Anónimo', timestamp:fecha };
    this.mensajes.push(nuevoMensaje);
    
  
  }

  private async enviarMensajeAlServidor() {
    if (this.chatService.getIdConversacion() === undefined) {
      this.crearConversacion();
    } else{
      if (this.mensajeInsertar.trim() === '') {
        // Evitar enviar mensajes vacíos
        console.log("El mensaje está vacío. No se enviará.");
        this.cargandoRespuesta = false;
        this.setFocusToMessageInput();
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
    this.cdr.detectChanges();
    this.scrollDown();
    this.cargandoRespuesta = false;
    this.setFocusToMessageInput();
    
  }

 
  formatMessage(texto: string) {
    const imgRegex = /!\[(.*?)\]\((.*?)\)/g;
    const img2Regex = /\[(.*?)\]\((.*?)\)/g;
    const boldRegex = /\*\*(.*?)\*\*/g;
    const unicodeEmojiRegex = /\\u\{([0-9a-fA-F]+)\}/g;
  
    let formattedText = texto
      .replace(imgRegex, (match, altText, url) => 
        `<div>
          <img style="max-width: 300px; max-height: 300px" src="${url}" alt="${altText}">
        </div>`)
      .replace(img2Regex, (match, altText, url) =>
        `<div>
          <img style="max-width: 300px; max-height: 300px" src="${url}" alt="${altText}">
        </div>`)
      .replace(boldRegex, '<b>$1</b>')
      .replace(unicodeEmojiRegex, (match, codePoint) => 
        String.fromCodePoint(parseInt(codePoint, 16))
      );
  
    return this.sanitizer.bypassSecurityTrustHtml(formattedText);
  }

  
  private extraerUrlsImagenes(texto: string): string[] {
    const regex = /\]\((.*?)\)/g;
    let matches;
    const urls = [];
  
    while (matches = regex.exec(texto)) {
      urls.push(matches[1]);
    }
  
    return urls;
   
  }
  
  private extraerDescripcionesImagenes(texto: string): string[] {
    const regex = /!\[(.*?)\]/g;
    
    let matches;
    const descripciones = [];
  
    while (matches = regex.exec(texto)) {
      descripciones.push(matches[1]);
    }
  
    return descripciones;
  }

  private getImages (texto: string){
    let urls = this.extraerUrlsImagenes(texto);
    let descripciones = this.extraerDescripcionesImagenes(texto);

    return   urls.map((url, index) => ({
      itemImageSrc: url,
      title: descripciones[index] || 'Imagen sin descripción',
      alt: descripciones[index] || 'Imagen sin descripción'
    }));
    
  }

  hasMultipleImages(texto: string): boolean {
    const urls = this.extraerUrlsImagenes(texto);
    return urls.length > 1;
  }

  actualizarGaleria(texto: string) {
    if (this.hasMultipleImages(texto)) {
      this.images = this.getImages(texto);
      this.cdr.detectChanges();
      console.log(this.images); //
      this.displayBasic = true;
    } else {
      this.displayBasic = false;
    }
  }
  

  formatTimeAgo(timestamp:Date) {
   
    if (!(timestamp instanceof Date)) {

      timestamp = new Date(timestamp);
    }
  
 
    return timestamp.toLocaleDateString() + ' ' + timestamp.toLocaleTimeString(); 
  }


private scrollDown(): void {
  try {
    this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    ;
  } catch(err) { } 
}
  

  private setFocusToMessageInput(): void {
    this.messageInputField.nativeElement.focus()
    
  }

 
  handleEmojiSelected(emoji: string) {
    
    this.nuevoMensaje += emoji;
  }

  showCargandoInfo() {
    if (this.nuevoMensaje.trim() !== '') {
      this.messageService.add({ key: 'chat', severity:'info', summary:'Gepeto está escribieno', detail:'Espere a su respuesta antes de envíar el siguiente mensaje.'});
    }
   
  }
  onUpload(event: UploadEvent) {
    this.messageService.add({ severity: 'info', summary: 'Success', detail: 'File Uploaded with Basic Mode' });
}
    
    
    
 
 
}


