import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tareas } from '../models/tareas';
import { Observable } from 'rxjs';

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
  putEditarTarea(IDtareas: any,tarea: tareas){
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


}
