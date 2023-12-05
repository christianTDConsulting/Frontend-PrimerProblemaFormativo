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

import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import {FormsModule} from '@angular/forms';

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
    AutoFocusModule
  ],
  declarations: [ViewChatComponent,GridViewComponent, ChatComponent],
  providers: [MessageService],
})
export class ViewChatModule { }
