import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tareas } from '../models/tareas';

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

  getTareascancel(){
    return this.http.get(`${this.url}/cancel`)
  }

  // Registrar:
  //http://localhost:5000/api/tareas
  postTarea(tarea: tareas){
    return this.http.post(this.url, tarea);
  }

  // Eliminar tarea:
  //http://localhost:5000/api/tareas
  deleteTarea(IDtareas: any){
    return this.http.delete(`${this.url}?IDtareas=${IDtareas}`);
  }


}
