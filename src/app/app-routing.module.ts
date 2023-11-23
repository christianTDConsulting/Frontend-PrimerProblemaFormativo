import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ViewAdminGuard } from './guards/view-admin-guard.guard';
import { ViewAdminComponent } from './pages/viewAdmin/viewAdmin.component';
import { ViewLoginComponent } from './pages/viewLogin/viewLogin.component'; // Assuming this is your login component
import { ViewClienteGuard } from './guards/view-cliente.guard';
import { TelefonosComponent } from './components/telefonoDialog/telefono/telefonos.component';
import { ViewMunicipiosComponent } from './pages/viewMunicipios/viewMunicipios.component';

const routes: Routes = [
  { path: '', redirectTo: 'viewLogin', pathMatch: 'full' },
  { path: 'viewAdmin', component: ViewAdminComponent, canActivate: [ViewAdminGuard] },
  { path: 'viewLogin', component: ViewLoginComponent },
  { path: 'viewMetereologia', component: ViewMunicipiosComponent },
  {path: 'viewClient', component: TelefonosComponent, canActivate: [ViewClienteGuard]}
  // Add other routes if needed
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
