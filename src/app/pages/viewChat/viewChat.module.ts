import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViewChatComponent } from './viewChat.component';
import { GridViewComponent } from './component/gridView/gridView.component';
import { ChatComponent } from './component/chat/chat.component';

import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { AccordionModule } from 'primeng/accordion';
import { DialogModule } from 'primeng/dialog';
import { SidebarModule } from 'primeng/sidebar';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { InputTextModule } from 'primeng/inputtext'; 
import { AvatarModule } from 'primeng/avatar';
import { DividerModule } from 'primeng/divider';
import { AutoFocusModule } from 'primeng/autofocus';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import {FormsModule} from '@angular/forms';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { EmojiPickerComponent } from './component/emoji-picker/emoji-picker.component'; 
import { GalleriaModule } from 'primeng/galleria';
import { ImageCheckerHistorialComponent } from '../viewVodafone/components/imageCheckerHistorial/imageCheckerHistorial.component';
import { DataViewModule } from 'primeng/dataview';
import { TagModule } from 'primeng/tag';
import { ToolbarModule } from 'primeng/toolbar';

@NgModule({
  imports: [
    CommonModule,
    ButtonModule,
    CardModule,
    AccordionModule,
    DialogModule,
    ToastModule,
    SidebarModule,
    ScrollPanelModule,  
    InputTextModule,
    FormsModule,
    AvatarModule,
    DividerModule,
    AutoFocusModule,
    ProgressSpinnerModule,
    OverlayPanelModule,
    GalleriaModule,
    DataViewModule,
    TagModule,
    ToolbarModule,
    ImageCheckerHistorialComponent,
  
    
  ],
  declarations: [ViewChatComponent,GridViewComponent, ChatComponent, EmojiPickerComponent],
  providers: [MessageService],
})
export class ViewChatModule { }
