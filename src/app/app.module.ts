import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { NavbarComponent } from './components/header/navbar/navbar.component';
import { EditarTareaComponent } from './tareas/editar-tarea/editar-tarea.component';
import { RegistrarTareaComponent } from './tareas/registrar-tarea/registrar-tarea.component';
import { EliminarTareaComponent } from './tareas/eliminar-tarea/eliminar-tarea.component';
import { EliminarusuarioComponent } from './components/user/eliminarusuario/eliminarusuario.component';
import { ModificarcontrasenyaComponent } from './components/user/modificarcontrasenya/modificarcontrasenya.component';
import { ModificarusuarioComponent } from './components/user/modificarusuario/modificarusuario.component';
import { AuthService } from './services/auth.service';
import { ModificarcargorolComponent } from './components/user/modificarcargorol/modificarcargorol.component';
import { AltausuarioComponent } from './components/user/altausuario/altausuario.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    //MÓDULO TAREAS:
    EditarTareaComponent,
    RegistrarTareaComponent,
    EliminarTareaComponent,
    EliminarusuarioComponent,
    ModificarcontrasenyaComponent,
    ModificarusuarioComponent,
    ModificarcargorolComponent,
    AltausuarioComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
