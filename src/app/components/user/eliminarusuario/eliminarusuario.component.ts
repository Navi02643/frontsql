import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-eliminarusuario',
  templateUrl: './eliminarusuario.component.html',
  styleUrls: ['./eliminarusuario.component.css'],
})
export class EliminarusuarioComponent implements OnInit {

  IDusuario = localStorage.getItem('ID');
  listainactivos: any = [];
  SA: any = '';
  msg: any = '';
  constructor(private userservice: UserService,private router: Router) {}

  ngOnInit(): void {
    this.validardatos();
    this.listaINA();
  }

  validardatos(){
    if(this.IDusuario == null){
      this.router.navigate(['/auth/login']);
    }
  }

  listaINA() {
    this.userservice.getuserINA().subscribe((value) => {
      this.listainactivos = value;
      this.SA = this.listainactivos.SA;
    });
  }

  borrarINA(IDusuario: number) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger',
      },
      buttonsStyling: false,
    });
    swalWithBootstrapButtons
      .fire({
        title: '¿Deseas eliminar al usuario?',
        text: 'Este cambio no se puede revertir',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Si',
        cancelButtonText: 'No',
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          this.userservice.deleteuserINA(IDusuario).subscribe((value) => {
            this.msg = value;
            if (this.msg.err == false) {
              swalWithBootstrapButtons.fire(this.msg.msg, '', 'success');
              this.ngOnInit();
            }
          });
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithBootstrapButtons.fire(
            'Cancelado',
            'El usuario no se elimino',
            'warning'
          );
        }
      });
  }

  reactivarINA(IDusuario: number) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger',
      },
      buttonsStyling: false,
    });
    swalWithBootstrapButtons
      .fire({
        title: '¿Deseas activar al usuario?',
        text: 'Puedes desactivarlo despues',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Si',
        cancelButtonText: 'No',
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          this.userservice.deleteREAC(IDusuario).subscribe((value) => {
            this.msg = value;
            if (this.msg.err == false) {
              swalWithBootstrapButtons.fire(this.msg.msg, '', 'success');
              this.ngOnInit();
            }
          });
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithBootstrapButtons.fire(
            'Cancelado',
            'El usuario no se activo',
            'warning'
          );
        }
      });
  }
}
