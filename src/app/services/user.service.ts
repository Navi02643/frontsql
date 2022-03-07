import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { UserP } from '../models/userpass';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  url = 'http://localhost:5000/api/usuario';

  constructor(private http: HttpClient) { }

  getuserINA(){
    return this.http.get(`${this.url}/INA`)
  }

  deleteuserINA(IDusuario: any){
    return this.http.delete(`${this.url}/borrar?IDusuario=${IDusuario}`)
  }

  deleteREAC(IDusuario: any){
    return this.http.delete(`${this.url}/REAC?IDusuario=${IDusuario}`)
  }

  putpassword(IDusuario: any,user: UserP){
    return this.http.put(`${this.url}/pass`,user)
  }

}
