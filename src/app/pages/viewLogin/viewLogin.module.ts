import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewLoginComponent } from './viewLogin.component';
import { LoginComponent } from './components/login/login.component';
import { UsuarioFormModule } from 'src/app/formDialog/usuarioForm/usuarioForm.module';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { CardModule } from 'primeng/card';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { MessageService } from 'primeng/api';
@NgModule({
  imports: [
    CommonModule,
    UsuarioFormModule,
    ButtonModule,
    ToastModule,
    CardModule,
    FormsModule,
    ReactiveFormsModule,
        
  ],
  declarations: [ViewLoginComponent, LoginComponent],
  exports: [ViewLoginComponent],
  providers: [MessageService]
})
export class ViewLoginModule { }
