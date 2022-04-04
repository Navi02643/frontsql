import { Component, OnInit } from '@angular/core';
import { TareasService } from 'src/app/services/tarea.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-actualizar-tarea',
  templateUrl: './actualizar-tarea.component.html',
  styleUrls: ['./actualizar-tarea.component.css'],
})
export class ActualizarTareaComponent implements OnInit {
  message: any = '';
  IDusuarioVD = localStorage.getItem('ID');
  IDrolVD = Number(localStorage.getItem('ROL'));
  IDcargo = Number(localStorage.getItem('CARGO'));

  constructor(
    private router: Router,
    private tareasS: TareasService,
    private authservice: AuthService
  ) {}

  TareasInfo: any = {
    IDtareas: '',
    IDusuario: '',
    tareanombre: '',
    tareadescripcion: '',
    tareafechaf: '',
  };

  ngOnInit(): void {
    this.getTareas();
    this.validardatos();
  }

  validardatos() {
    if (this.IDusuarioVD == null || this.IDrolVD != 1 || this.IDcargo != 7) {
      this.authservice.logout();
      this.router.navigate(['/auth/login']);
    }
  }

  getTareas() {
    return this.tareasS.getTareasAll().subscribe((value) => {
      this.TareasInfo = value;
      this.TareasInfo = this.TareasInfo.rows;
    });
  }
  deleteTarea(IDtareas: number) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success m-10px',
        cancelButton: 'btn btn-danger',
      },
      buttonsStyling: false,
    });
    swalWithBootstrapButtons
      .fire({
        title: '¿Estás seguro de que quieres editar esta tarea?',
        text: 'No podrás revertir esta acción o al menos de que la vuelvas a modificar.',
        icon: 'warning',
        showCloseButton: true,
        showCancelButton: true,
        confirmButtonText: 'Si',
        cancelButtonText: 'No',
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          this.tareasS.deleteTarea(IDtareas).subscribe((value) => {
            this.message = value;
            if (this.message.err == false) {
              swalWithBootstrapButtons.fire(
                this.message.message,
                '',
                'success'
              );
              this.ngOnInit();
            }
          });
        }
      });
  }
}
