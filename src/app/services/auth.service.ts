import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserI } from '../models/user';
import { JwtResponseI } from '../models/jwt-response';
import { tap } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable()

export class AuthService {
  AUTH_SERVER: string = 'http://localhost:5000/api';
  authSubject = new BehaviorSubject(false);
  private token: string;
  constructor(private httpClient: HttpClient) { }

  login(user: UserI): Observable<JwtResponseI> {
    console.log(user)
    return this.httpClient.post<JwtResponseI>(`${this.AUTH_SERVER}/login`,
    user).pipe(tap(
      (res:JwtResponseI) => {
        if (res) {
          //guardar token
          this.saveToken(res.Info.usuarionombres);
        }
      })
    );
  }

  logout(){
    this.token = '';
    localStorage.removeItem("ACCESS_TOKEN");
    localStorage.removeItem("EXPIRES_IN");
  }

  private saveToken(token:string): void {
    localStorage.setItem("USER", token);
    this.token = token;
  }

  // private getToken(): string {
  //   if (!this.token) {
  //     this.token = localStorage.getItem("ACCESS_TOKEN");
  //   }
  //   return this.token;
  // }

}
