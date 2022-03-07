import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditarTareaComponent } from './tareas/editar-tarea/editar-tarea.component';
import { EliminarTareaComponent } from './tareas/eliminar-tarea/eliminar-tarea.component';
import { RegistrarTareaComponent } from './tareas/registrar-tarea/registrar-tarea.component';


const routes: Routes = [
  {path: '' , redirectTo: '/auth',pathMatch: 'full'},
  {path: 'auth', loadChildren: () => import ('./auth/auth.module').then(x => x.AuthModule) },
  {path: 'registrarTarea', component: RegistrarTareaComponent, pathMatch:'full'},
  {path: 'eliminarTarea', component: EliminarTareaComponent, pathMatch:'full'},
  {path: 'editarTarea', component: EditarTareaComponent, pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
