import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//import { ClientesComponent } from './clientes/clientes.component';
//import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  { path: '', redirectTo: '/', pathMatch: 'full' },
  //{ path: 'clientes', component: ClientesComponent },
  //{ path: 'register', component: RegisterComponent },

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
