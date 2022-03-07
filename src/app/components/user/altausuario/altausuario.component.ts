import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ChargesService } from 'src/app/services/charges.service';
import { RolesService } from 'src/app/services/roles.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-altausuario',
  templateUrl: './altausuario.component.html',
  styleUrls: ['./altausuario.component.css'],
})
export class AltausuarioComponent implements OnInit {
  IDusuario = localStorage.getItem('ID');
  formulariouser: FormGroup;
  registro: any = [];
  listaroles: any = [];
  listacargos: any = [];
  constructor(
    private roleservices: RolesService,
    private chargesservie: ChargesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.validardatos();
    this.createform();
    this.getrole();
    this.getcharge();
  }

  validardatos() {
    if (this.IDusuario == null) {
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
      usuarionombres: new FormControl('',Validators.pattern('^[a-zA-Z ]*$')),
      usuarioapellidoP: new FormControl('',Validators.pattern('^[a-zA-Z ]*$')),
      usuarioapellidoM: new FormControl('',Validators.pattern('^[a-zA-Z ]*$')),
      usuarioemail: new FormControl('',Validators.email),
      usuariotelefono: new FormControl(''),
      IDrol: new FormControl(''),
      usuariocontrasenya: new FormControl(''),
      IDcargo: new FormControl(''),
      usuariosalario: new FormControl(''),
    });
  }

  enviar() {
    this.registro = this.formulariouser.value;
    console.log(this.registro);
  }
}
