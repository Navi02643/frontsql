import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RolesService {

  url = 'http://localhost:5000/api/role';

  constructor(private http: HttpClient) { }

  getrolesACT(){
    return this.http.get(`${this.url}`)
  }

}
