import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ChargesService {

  url = 'http://localhost:5000/api/cargos';

  constructor(private http: HttpClient) { }

  getcargosACT(){
    return this.http.get(`${this.url}`)
  }
}
