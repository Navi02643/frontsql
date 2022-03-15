import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProyectoModel } from '../models/proyecto';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  url = 'http://localhost:5000/api/proyectos';

  constructor(private http: HttpClient) { }

  getProyectoAll(){
    return this.http.get(this.url)
  }

  postProyecto(proyecto: ProyectoModel){
    return this.http.post(this.url, proyecto);
  }

  deleteProyecto(IDproyecto: any){
    return this.http.delete(`${this.url}?IDproyecto=${IDproyecto}`);
  }


}
