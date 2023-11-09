import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ViewAdminGuard } from './view-admin-guard.guard';
import { ViewAdminComponent } from './pages/viewAdmin/viewAdmin.component';
import { ViewLoginComponent } from './pages/viewLogin/viewLogin.component'; // Assuming this is your login component
import { ViewClienteGuard } from './view-cliente.guard';
import { TelefonosComponent } from './telefonos/telefonos.component';

const routes: Routes = [
  { path: '', redirectTo: 'viewLogin', pathMatch: 'full' },
  { path: 'viewAdmin', component: ViewAdminComponent, canActivate: [ViewAdminGuard] },
  { path: 'viewLogin', component: ViewLoginComponent },
  {path: 'viewClient', component: TelefonosComponent, canActivate: [ViewClienteGuard]}
  // Add other routes if needed
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
