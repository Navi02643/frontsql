import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { NavbarComponent } from './components/header/navbar/navbar.component';
import { EliminarusuarioComponent } from './components/user/eliminarusuario/eliminarusuario.component';
import { ModificarcontrasenyaComponent } from './components/user/modificarcontrasenya/modificarcontrasenya.component';
import { ModificarusuarioComponent } from './components/user/modificarusuario/modificarusuario.component';
import { AuthService } from './services/auth.service';
import { ModificarcargorolComponent } from './components/user/modificarcargorol/modificarcargorol.component';
import { AltausuarioComponent } from './components/user/altausuario/altausuario.component';
import { RegistrarProyectoComponent } from './components/proyectos/registrar-proyecto/registrar-proyecto.component';
import { EditarProyectoComponent } from './components/proyectos/editar-proyecto/editar-proyecto.component';
import { EliminarProyectoComponent } from './components/proyectos/eliminar-proyecto/eliminar-proyecto.component';
import { VerProyectoComponent } from './components/proyectos/ver-proyecto/ver-proyecto.component';
import { DashboardComponent } from './components/home/dashboard/dashboard.component';
import { EditarTareaComponent } from './components/tareas/editar-tarea/editar-tarea.component';
import { RegistrarTareaComponent } from './components/tareas/registrar-tarea/registrar-tarea.component';
import { EliminarTareaComponent } from './components/tareas/eliminar-tarea/eliminar-tarea.component';
import { TareasLayoutComponent } from './components/tareas/tareas-layout/tareas-layout.component';
import { ActualizarTareaComponent } from './components/tareas/actualizar-tarea/actualizar-tarea.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    EliminarusuarioComponent,
    ModificarcontrasenyaComponent,
    ModificarusuarioComponent,
    ModificarcargorolComponent,
    AltausuarioComponent,
    RegistrarProyectoComponent,
    EditarProyectoComponent,
    EliminarProyectoComponent,
    VerProyectoComponent,
    DashboardComponent,
    //MÓDULO TAREAS:
    EditarTareaComponent,
    RegistrarTareaComponent,
    EliminarTareaComponent,
    TareasLayoutComponent,
    ActualizarTareaComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
