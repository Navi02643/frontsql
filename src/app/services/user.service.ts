import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { UserP } from '../models/userpass';
import { UserData } from '../models/userdata'

@Injectable({
  providedIn: 'root'
})
export class UserService {

  url = 'http://localhost:5000/api/usuario';

  constructor(private http: HttpClient) { }

  getuserINA(){
    return this.http.get(`${this.url}/INA`);
  }

  deleteuserINA(IDusuario: any){
    return this.http.delete(`${this.url}/borrar?IDusuario=${IDusuario}`);
  }

  deleteREAC(IDusuario: any){
    return this.http.delete(`${this.url}/REAC?IDusuario=${IDusuario}`);
  }

  putdatauser(IDusuario: any,user: UserData){
    return this.http.put(`${this.url}?IDusuario=${IDusuario}`,user);
  }

  putpassword(IDusuario: any,user: UserP){
    return this.http.put(`${this.url}/pass?IDusuario=${IDusuario}`,user);
  }

}
