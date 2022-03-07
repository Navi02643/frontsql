import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/header/navbar/navbar.component';
import { HttpClientModule } from '@angular/common/http';
import { EditarTareaComponent } from './tareas/editar-tarea/editar-tarea.component';
import { RegistrarTareaComponent } from './tareas/registrar-tarea/registrar-tarea.component';
import { EliminarTareaComponent } from './tareas/eliminar-tarea/eliminar-tarea.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    //MÓDULO TAREAS:
    EditarTareaComponent,
    RegistrarTareaComponent,
    EliminarTareaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
