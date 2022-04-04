import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tareas } from '../models/tareas';
import { tareasPF } from '../models/tareasput';
import { tareasEST } from '../models/tareaputestado'

@Injectable({
  providedIn: 'root'
})
export class TareasService {

  url = 'http://localhost:5000/api/tareas';

  constructor(private http: HttpClient) { }

  // Traer las tareas:
  //http://localhost:5000/api/tareas
  getTareasAll(){
    return this.http.get(this.url)
  }

  // Registrar:
  //http://localhost:5000/api/tareas
  postTarea(tarea: tareas){
    return this.http.post(this.url, tarea);
  }

  // getTareaById(IDtareas: number): Observable<Object> {
  //   return this.http.get<TareasService>(`${this.url}/${IDtareas}`);
  // }

  //Actualizar/editar tarea:
  // http://localhost:5000/api/tareas?IDtareas=(id)
  putEditarTarea(IDtareas: any,tarea: tareasPF){
    return this.http.put(`${this.url}?IDtareas=${IDtareas}`,tarea);
  }

  // Cancelar tarea:
  //http://localhost:5000/api/tareas/cancel
  getTareaCancel(){
    return this.http.get(`${this.url}/cancel`)
  }

  // Eliminar tarea:
  //http://localhost:5000/api/tareas
  deleteTarea(IDtareas: any){
    return this.http.delete(`${this.url}?IDtareas=${IDtareas}`);
  }

  gettareaesp(IDtareas:any){
    return this.http.get(`${this.url}/tarea?IDtareas=${IDtareas}`);
  }

  deletereactivar(IDtareas:any){
    return this.http.delete(`${this.url}/react?IDtareas=${IDtareas}`);
  }

  gettareaproyecto(IDusuario: any,IDproyecto:any){
    return this.http.get(`${this.url}/usuario?IDusuario=${IDusuario}&IDproyecto=${IDproyecto}`);
  }

  putestado(IDtareas: any,estado: any){
    return this.http.put(`${this.url}/estado?IDtareas=${IDtareas}`,estado);
  }

}
