import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EliminarusuarioComponent } from './components/user/eliminarusuario/eliminarusuario.component';
import { ModificarcontrasenyaComponent } from './components/user/modificarcontrasenya/modificarcontrasenya.component'
import { ModificarusuarioComponent } from './components/user/modificarusuario/modificarusuario.component';
import { NavbarComponent } from 'src/app/components/header/navbar/navbar.component';
import { ModificarcargorolComponent } from 'src/app/components/user/modificarcargorol/modificarcargorol.component';
import { AltausuarioComponent } from 'src/app/components/user/altausuario/altausuario.component'
//import { LoginComponent } from 'src/app/auth/login/login.component'

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'auth', loadChildren: () => import ('./auth/auth.module').then(x => x.AuthModule) },
  // { path: '', component: LoginComponent, pathMatch: 'full' },
  { path: 'navbar',component: NavbarComponent,pathMatch: 'full' },
  { path: 'deleteuser',component: EliminarusuarioComponent,pathMatch: 'full' },
  { path: 'changepass',component: ModificarcontrasenyaComponent,pathMatch:'full' },
  { path: 'changeuserdata',component: ModificarusuarioComponent,pathMatch: 'full' },
  { path: 'changerole',component: ModificarcargorolComponent,pathMatch: 'full' },
  { path: 'register',component: AltausuarioComponent,pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
