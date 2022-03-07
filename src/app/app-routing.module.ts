import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EliminarusuarioComponent } from './components/user/eliminarusuario/eliminarusuario.component';
import { ModificarcontrasenyaComponent } from './components/user/modificarcontrasenya/modificarcontrasenya.component'
import { ModificarusuarioComponent } from './components/user/modificarusuario/modificarusuario.component'

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login',component: LoginComponent,pathMatch: 'full'},
  { path: 'auth', loadChildren: () => import ('./auth/auth.module').then(x => x.AuthModule) },
  { path: 'deleteuser',component: EliminarusuarioComponent,pathMatch: 'full' },
  { path: 'changepass',component: ModificarcontrasenyaComponent,pathMatch:'full' },
  { path: 'changeuserdata',component: ModificarusuarioComponent,pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
