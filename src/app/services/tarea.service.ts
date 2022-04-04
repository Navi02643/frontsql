import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tareas } from '../models/tareas';
import { tareasPF } from '../models/tareasput';
import { tareasEST } from '../models/tareaputestado';

@Injectable({
  providedIn: 'root',
})
export class TareasService {
  url = 'http://localhost:5000/api/tareas';

  constructor(private http: HttpClient) {}

  getTareasAll() {
    return this.http.get(this.url);
  }

  getTareaCancel() {
    return this.http.get(`${this.url}/cancel`);
  }

  gettareaesp(IDtareas: any) {
    return this.http.get(`${this.url}/tarea?IDtareas=${IDtareas}`);
  }

  gettareaproyecto(IDusuario: any, IDproyecto: any) {
    return this.http.get(
      `${this.url}/usuario?IDusuario=${IDusuario}&IDproyecto=${IDproyecto}`
    );
  }

  postTarea(tarea: tareas) {
    return this.http.post(this.url, tarea);
  }

  putestado(IDtareas: any, estado: any) {
    return this.http.put(`${this.url}/estado?IDtareas=${IDtareas}`, estado);
  }

  putEditarTarea(IDtareas: any, tarea: tareasPF) {
    return this.http.put(`${this.url}?IDtareas=${IDtareas}`, tarea);
  }

  deleteTarea(IDtareas: any) {
    return this.http.delete(`${this.url}?IDtareas=${IDtareas}`);
  }

  deletereactivar(IDtareas: any) {
    return this.http.delete(`${this.url}/react?IDtareas=${IDtareas}`);
  }
}
