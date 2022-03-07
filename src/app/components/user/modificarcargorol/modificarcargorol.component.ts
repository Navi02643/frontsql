import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ChargesService } from 'src/app/services/charges.service';
import { RolesService } from 'src/app/services/roles.service';
import { UserService } from 'src/app/services/user.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-modificarcargorol',
  templateUrl: './modificarcargorol.component.html',
  styleUrls: ['./modificarcargorol.component.css'],
})
export class ModificarcargorolComponent implements OnInit {
  IDusuario2 = localStorage.getItem('ID');
  formulariorolescargos: FormGroup;
  listausuarios: any = [];
  listaroles: any = [];
  listacargos: any = [];
  registro: any = [];
  IDusuario = '';
  msg: any = [];
  userdata: any={
    IDrol: "",
    IDcargo: "",
    usuarioestado: "",
    usuariosalario: "",
  };

  constructor(
    private roleservices: RolesService,
    private chargesservie: ChargesService,
    private userservice: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.validardatos();
    this.getusers();
    this.getrole();
    this.getcharge();
    this.crearform();
  }

  validardatos(){
    if(this.IDusuario2 == null){
      this.router.navigate(['/auth/login']);
    }
  }

  data(){
    this.IDusuario = this.formulariorolescargos.value.IDusuario;
    this.userservice.getuseresp(this.IDusuario).subscribe(value=>{
      this.userdata = value;
      this.userdata =  this.userdata.rows;
      console.log(this.userdata);
    })
  }

  getusers() {
    this.userservice.getuserall().subscribe((value) => {
      this.listausuarios = value;
    });
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

  crearform() {
    this.formulariorolescargos = new FormGroup({
      IDusuario: new FormControl('', Validators.required),
      IDcargo: new FormControl(''),
      IDrol: new FormControl(''),
      usuariosalario: new FormControl(''),
      usuarioestado: new FormControl(''),
    });
  }

  enviar() {
    this.registro = this.formulariorolescargos.value;
    this.IDusuario = this.formulariorolescargos.value.IDusuario;
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger',
      },
      buttonsStyling: false,
    });
    swalWithBootstrapButtons
      .fire({
        title: '¿Deseas modificar al usuario?',
        text: 'Este cambio no se puede revertir',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Si',
        cancelButtonText: 'No',
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          this.userservice
            .putrole(this.IDusuario, this.registro)
            .subscribe((value) => {
              this.msg = value;
              if (this.msg.err == false) {
                swalWithBootstrapButtons.fire(this.msg.msg, '', 'success');
                window.location.reload();
              }
            });
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithBootstrapButtons.fire(
            'Cancelado',
            'El usuario no se modifico',
            'warning'
          );
        }
      });
  }
}
