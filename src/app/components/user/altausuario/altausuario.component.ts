import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ChargesService } from 'src/app/services/charges.service';
import { RolesService } from 'src/app/services/roles.service';
import { UserService } from 'src/app/services/user.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-altausuario',
  templateUrl: './altausuario.component.html',
  styleUrls: ['./altausuario.component.css'],
})
export class AltausuarioComponent implements OnInit {
  IDusuario = localStorage.getItem('ID');
  IDrolLS = Number(localStorage.getItem('ROL'));
  formulariouser: FormGroup;
  registro: any = [];
  listaroles: any = [];
  listacargos: any = [];
  msg: any = [];

  constructor(
    private roleservices: RolesService,
    private chargesservie: ChargesService,
    private router: Router,
    private authservice: AuthService,
    private userserice: UserService
  ) {}

  ngOnInit(): void {
    this.validardatos();
    this.createform();
    this.getrole();
    this.getcharge();
  }

  validardatos() {
    if (this.IDusuario == null || this.IDrolLS != 1) {
      this.authservice.logout();
      this.router.navigate(['/auth/login']);
    }
  }

  getrole() {
    this.roleservices.getrolesACT().subscribe((value) => {
      this.listaroles = value;
    });
  }

  getcharge() {
    this.chargesservie.getcargosACT().subscribe((value) => {
      this.listacargos = value;
    });
  }

  createform() {
    this.formulariouser = new FormGroup({
      usuarionombres: new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-zA-Z ]*$'),
      ]),
      usuarioapellidoP: new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-zA-Z ]*$'),
      ]),
      usuarioapellidoM: new FormControl('', [
        Validators.pattern('^[a-zA-Z ]*$'),
      ]),
      usuarioemail: new FormControl('', [
        Validators.required,
        Validators.email,
      ]),
      usuariotelefono: new FormControl('', [Validators.pattern('^[0-9]*$')]),
      IDrol: new FormControl('', [Validators.required]),
      usuariocontrasenya: new FormControl('', [Validators.required]),
      IDcargo: new FormControl('', [Validators.required]),
      usuariosalario: new FormControl('', [
        Validators.required,
        Validators.pattern('^[0-9]*$'),
      ]),
    });
  }

  enviar() {
    this.registro = this.formulariouser.value;
    this.userserice.postuser(this.registro).subscribe((value) => {
      this.msg = value;
      if (this.msg.err == true) {
        Swal.fire({
          title: 'Error',
          text: this.msg.msg,
          icon: 'error',
        });
      } else {
        Swal.fire({
          title: 'Exito',
          text: this.msg.msg,
          icon: 'success',
          timer: 3000,
        });
        this.ngOnInit();
      }
    });
  }
}
