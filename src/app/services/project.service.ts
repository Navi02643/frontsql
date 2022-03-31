import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProyectoModel } from '../models/proyecto';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  url = 'http://localhost:5000/api/proyectos';
  url2 = 'http://localhost:5000/api/estados';

  constructor(private http: HttpClient) { }

  getProyectoAll(){
    return this.http.get(this.url)
  }

  getProyectoCANCEL(){
    return this.http.get(`${this.url}/cancel`)
  }

  seleccionar(IDproyecto: any){
    return this.http.get(`${this.url}/proyecto?IDproyecto=${IDproyecto}`);
  }

  postProyecto(proyecto: ProyectoModel){
    return this.http.post(this.url, proyecto);
  }

  putProyecto(IDproyecto: any, proyecto: ProyectoModel){
    return this.http.put(`${this.url}?IDproyecto=${IDproyecto}`, proyecto);
  }

  putProyectoCANCEL(IDproyecto: any, proyecto: ProyectoModel){
    return this.http.put(`${this.url}/pause?IDproyecto=${IDproyecto}`, proyecto);
  }

  deleteProyecto(IDproyecto: any){
    return this.http.delete(`${this.url}?IDproyecto=${IDproyecto}`);
  }

  //////////////////////////SERVICIO UNICAMENTE PARA TRAER LOS ESTADOS DE LOS PROYECTOS/////////////////////

  getStatus(){
    return this.http.get(this.url2);
  }

}
