import { Component, ElementRef, EventEmitter, Output, ViewChild } from "@angular/core";
import { OverlayPanel } from "primeng/overlaypanel";


@Component({
  selector: "app-emoji-picker",
  templateUrl: "./emoji-picker.component.html",
  styleUrls: ["./emoji-picker.component.css"],
})
export class EmojiPickerComponent {
  isOpened = false;
 
  @Output() emojiSelected = new EventEmitter<string>();




  constructor() {
 
  }
  emojiCategories = [
    { name: 'Frecuentes', emojis: ['😀', '😂', '😍', '😭', '😊', '👍'] },
    { name: 'Sonrisas y Emociones', emojis: ['😄', '😅', '😆', '😁', '🤣', '😇'] },
    { name: 'Gestos y Cuerpo', emojis: ['👋', '🤚', '🖐️', '✋', '🖖', '👌', '🤏', '✌️', '🤞', '🤟'] },
    { name: 'Personas y Fantasía', emojis: ['👶', '🧒', '👦', '👧', '👨', '👩', '👴', '👵', '🧑', '👼'] },
    { name: 'Ropa y Accesorios', emojis: ['👚', '👕', '👖', '👔', '👗', '👙', '👘', '👠', '👡', '👢'] },
    { name: 'Animales y Naturaleza', emojis: ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼', '🐨', '🐯', '🌞', '🌝', '🌺', '🍁', '🌍', '🌊', '🏞️', '🏝️', '🏔️', '🌋'] },
    { name: 'Alimentos y Bebidas', emojis: ['🍏', '🍎', '🍐', '🍊', '🍋', '🍌', '🍉', '🍇', '🍓', '🍈', '🍔', '🍟', '🍕', '🌮', '🌯', '🍣', '🍤', '🍦', '🍰', '🍩'] },
    { name: 'Viajes y Lugares', emojis: ['🚗', '🚕', '🚙', '🚌', '🚎', '🏎️', '🚓', '🚑', '🚒', '🚐'] },
    { name: 'Actividades', emojis: ['⚽', '🏀', '🏈', '⚾', '🥎', '🏐', '🏉', '🎾', '🥏', '🎱'] },
    { name: 'Objetos', emojis: ['⌚', '📱', '💻', '⌨️', '🖥️', '🖨️', '🖱️', '🖲️', '🕹️', '🗜️'] },
    { name: 'Símbolos', emojis: ['💘', '💝', '💖', '💗', '💓', '💞', '💕', '💟', '❣️', '💔', '💖', '💘', '💝', '💟', '❤️', '💔', '💣', '💥', '💫', '💦', '🌟', '💫', '✨', '⭐', '🌠', '🌌', '💢'] },
    { name: 'Banderas', emojis: ['🏁', '🚩', '🎌', '🏴', '🏳️', '🏳️‍🌈', '🏴‍☠️', '🇦🇫', '🇦🇱', '🇩🇿'] },
    { name: 'Otros', emojis: ['🤖', '👽', '🎃', '🎅', '🤶', '🧙', '🧚', '🧛', '🧜', '🧝', '🤩', '😎', '😜', '😺', '🦄', '🍭', '🎉', '🌈', '🌻', '🌼'] },
    { name: 'Deportes y Recreación', emojis: ['🏆', '🥇', '🥈', '🥉', '🏒', '🏓', '🏸', '🥊', '⛷️', '🏄'] },
    { name: 'Transporte', emojis: ['🚁', '🚂', '🛴', '🚤', '🚀', '🛸', '🚲', '🛵', '🚆', '🚢'] },
    { name: 'Música', emojis: ['🎵', '🎶', '🎤', '🎧', '🎸', '🥁', '🎺', '🎷', '🎻', '🪕'] }
];


  onEmojiClick(emoji: string) {
    this.emojiSelected.emit(emoji);
  }

 

  toggled(op: OverlayPanel, event: Event) {
   
    this.isOpened = !this.isOpened;
    op.toggle(event);
   
  }
}