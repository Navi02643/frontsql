import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EliminarusuarioComponent } from './components/user/eliminarusuario/eliminarusuario.component';
import { LoginComponent } from './auth/login/login.component';
import { ModificarcontrasenyaComponent } from './components/user/modificarcontrasenya/modificarcontrasenya.component'

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login',component: LoginComponent,pathMatch: 'full'},
  { path: 'auth', loadChildren: () => import ('./auth/auth.module').then(x => x.AuthModule) },
  { path: 'deleteuser',component: EliminarusuarioComponent,pathMatch: 'full' },
  { path: 'changepass',component: ModificarcontrasenyaComponent,pathMatch:'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
