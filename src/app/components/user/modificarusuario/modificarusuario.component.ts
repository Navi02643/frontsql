import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';

import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modificarusuario',
  templateUrl: './modificarusuario.component.html',
  styleUrls: ['./modificarusuario.component.css'],
})
export class ModificarusuarioComponent implements OnInit {
  IDusuario = localStorage.getItem('ID');
  editvalue: any = [];
  formulariousuarioedit: FormGroup;
  userdata: any={
    usuarionombres: "",
    usuarioapellidoP: "",
    usuarioapellidoM: "",
    usuarioemail: "",
    usuariotelefono: "",
  };
  msg: any = '';

  constructor(private userservice: UserService, private router: Router) {}

  ngOnInit(): void {
    this.validardatos();
    this.createform();
    this.data();
  }

  data(){
    this.userservice.getuseresp(this.IDusuario).subscribe(value=>{
      this.userdata = value;
      this.userdata =  this.userdata.rows;
    })
  }

  validardatos() {
    if (this.IDusuario == null) {
      this.router.navigate(['/auth/login']);
    }
  }

  createform() {
    this.formulariousuarioedit = new FormGroup({
      usuarionombres: new FormControl('', Validators.pattern('^[a-zA-Z ]*$')),
      usuarioapellidoP: new FormControl('', Validators.pattern('^[a-zA-Z ]*$')),
      usuarioapellidoM: new FormControl('', Validators.pattern('^[a-zA-Z ]*$')),
      usuarioemail: new FormControl('', Validators.email),
      usuariotelefono: new FormControl('', Validators.pattern('^[0-9]*$')),
    });
  }

  enviar() {
    this.editvalue = this.formulariousuarioedit.value;
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
            .putdatauser(this.IDusuario, this.editvalue)
            .subscribe((value) => {
              this.msg = value;
              if (this.msg.err == false) {
                swalWithBootstrapButtons.fire(this.msg.msg, '', 'success');
                this.ngOnInit();
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
