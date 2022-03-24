import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EliminarusuarioComponent } from './components/user/eliminarusuario/eliminarusuario.component';
import { ModificarcontrasenyaComponent } from './components/user/modificarcontrasenya/modificarcontrasenya.component';
import { ModificarusuarioComponent } from './components/user/modificarusuario/modificarusuario.component';
import { NavbarComponent } from 'src/app/components/header/navbar/navbar.component';
import { ModificarcargorolComponent } from 'src/app/components/user/modificarcargorol/modificarcargorol.component';
import { AltausuarioComponent } from 'src/app/components/user/altausuario/altausuario.component'
import { RegistrarProyectoComponent } from './components/proyectos/registrar-proyecto/registrar-proyecto.component';
import { EditarProyectoComponent } from './components/proyectos/editar-proyecto/editar-proyecto.component';
import { EliminarProyectoComponent } from './components/proyectos/eliminar-proyecto/eliminar-proyecto.component';
import { VerProyectoComponent } from './components/proyectos/ver-proyecto/ver-proyecto.component';
import { TareasLayoutComponent } from './components/tareas/tareas-layout/tareas-layout.component';
import { RegistrarTareaComponent } from './components/tareas/registrar-tarea/registrar-tarea.component';
import { EliminarTareaComponent } from './components/tareas/eliminar-tarea/eliminar-tarea.component';
import { EditarTareaComponent } from './components/tareas/editar-tarea/editar-tarea.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'auth', loadChildren: () => import ('./auth/auth.module').then(x => x.AuthModule) },
  { path: 'navbar',component: NavbarComponent,pathMatch: 'full' },
  { path: 'deleteuser',component: EliminarusuarioComponent,pathMatch: 'full' },
  { path: 'changepass',component: ModificarcontrasenyaComponent,pathMatch:'full' },
  { path: 'changeuserdata',component: ModificarusuarioComponent,pathMatch: 'full' },
  { path: 'changerole',component: ModificarcargorolComponent,pathMatch: 'full' },
  { path: 'register',component: AltausuarioComponent,pathMatch: 'full'},
  //MÓDULO TAREAS:
  {path: 'registrarTarea', component: RegistrarTareaComponent, pathMatch:'full'},
  {path: 'eliminarTarea', component: EliminarTareaComponent, pathMatch:'full'},
  {path: 'editarTarea', component: EditarTareaComponent, pathMatch:'full'},
  {path: 'tareasLayout', component: TareasLayoutComponent, pathMatch:'full'},
  //MODULO PROYECTOS:
  {path: 'registrar-proyecto', component: RegistrarProyectoComponent, pathMatch:'full'},
  {path: 'editar-proyecto', component: EditarProyectoComponent, pathMatch:'full'},
  {path: 'eliminar-proyecto', component: EliminarProyectoComponent, pathMatch:'full'},
  {path: 'ver-proyecto', component: VerProyectoComponent, pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
