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
  constructor(private httpClient: HttpClient) {}

  login(user: UserI): Observable<JwtResponseI> {
    return this.httpClient
      .post<JwtResponseI>(`${this.AUTH_SERVER}/login`, user)
      .pipe(
        tap((res: JwtResponseI) => {
          if (res) {
            this.saveToken(
              res.Info.accessToken,
              res.Info.IDusuario,
              res.Info.usuarionombres,
              res.Info.usuarioapellidoP,
              res.Info.usuarioapellidoM,
              res.Info.IDrol,
              res.Info.IDcargo
            );
          }
        })
      );
  }

  logout() {
    this.token = '';
    localStorage.removeItem('ACCESS_TOKEN');
    localStorage.removeItem('ID');
    localStorage.removeItem('USERNAME');
    localStorage.removeItem('USERAP1');
    localStorage.removeItem('USERAP2');
    localStorage.removeItem('ROL');
    localStorage.removeItem('CARGO');
  }

  private saveToken(
    token: string,
    IDusuario: any,
    usuarionombres: string,
    usuarioapellidoP: string,
    usuarioapellidoM: string,
    IDrol: string,
    IDcargo: string
  ): void {
    localStorage.setItem('ACCESS_TOKEN', token);
    localStorage.setItem('ID', IDusuario);
    localStorage.setItem('USERNAME', usuarionombres);
    localStorage.setItem('USERAP1', usuarioapellidoP);
    localStorage.setItem('USERAP2', usuarioapellidoM);
    localStorage.setItem('ROL', IDrol);
    localStorage.setItem('CARGO', IDcargo);
    this.token = token;
  }

}
