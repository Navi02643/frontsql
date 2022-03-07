import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service'

@Component({
  selector: 'app-modificarcontrasenya',
  templateUrl: './modificarcontrasenya.component.html',
  styleUrls: ['./modificarcontrasenya.component.css']
})
export class ModificarcontrasenyaComponent implements OnInit {

  pass: any = [];
  formulariocontrasenia = new FormGroup({
    passold: new FormControl('',[Validators.required]),
    passnew: new FormControl('',[Validators.required]),
    passcon: new FormControl('',[Validators.required])
  });

  ctrl = new FormControl('some value');


  constructor(private userservice: UserService) { }


  ngOnInit(): void {
  }

  enviar(){
    this.pass = this.formulariocontrasenia.value;
    console.log(this.pass);
    this.pass = window.localStorage.getItem("ACCESS_TOKEN")
    console.log(this.pass);
    console.log(this.ctrl.value);
  }

}
