import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { UserService } from 'src/app/services/user.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-modificarcontrasenya',
  templateUrl: './modificarcontrasenya.component.html',
  styleUrls: ['./modificarcontrasenya.component.css'],
})
export class ModificarcontrasenyaComponent implements OnInit {
  count = 0;
  IDusuario = 1;
  pass: any = [];
  msg: any = '';
  formulariocontrasenia: FormGroup;

  constructor(private userservice: UserService, private router: Router) {}

  ngOnInit(): void {
    this.crearform();
  }

  crearform() {
    this.formulariocontrasenia = new FormGroup({
      usuariocontrasenyaold: new FormControl('', Validators.required),
      usuariocontrasenyanew: new FormControl('', Validators.required),
      usuariocontrasenyaconf: new FormControl('', Validators.required),
    });
  }

  enviar() {
    this.pass = this.formulariocontrasenia.value;
    this.userservice
      .putpassword(this.IDusuario, this.pass)
      .subscribe((value) => {
        this.msg = value;
        if (this.msg.err == true) {
          this.count++;
          if (this.count < 3) {
            Swal.fire({
              title: 'Ocurrio un error',
              text: this.msg.msg,
              icon: 'warning',
              timer: 1500,
            });
          } else {
            Swal.fire({
              title: 'Ocurrio un error',
              text: 'Superaste el limite de intentos, se te redireccionara al inicio.',
              icon: 'error',
            }).then((item) => {
              if (item.isConfirmed == true) {
                this.router.navigate(['/auth']);
              }
            });
          }
        } else {
          Swal.fire({
            title: 'Exito',
            text: this.msg.msg,
            icon: 'success',
          }).then((item) => {
            if (item.isConfirmed == true) {
              this.router.navigate(['/auth']);
            }
          });
        }
      });
  }
}
