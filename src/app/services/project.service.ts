import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  url = 'http://localhost:5000/api/proyectos';

  constructor(private http: HttpClient) { }

  getProyectoAll(){
    return this.http.get(this.url)
  }


}
