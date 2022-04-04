import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { TareasService } from 'src/app/services/tarea.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-eliminar-tarea',
  templateUrl: './eliminar-tarea.component.html',
  styleUrls: ['./eliminar-tarea.component.css'],
})
export class EliminarTareaComponent implements OnInit {
  message: any = '';
  IDusuarioVD = localStorage.getItem('ID');

  constructor(
    private tareasS: TareasService,
    private router: Router,
    private authservice: AuthService
  ) {}

  TareasInfo: any = {
    IDtareas: '',
    // IDproyecto: "",
    IDusuario: '',
    // IDestado: "",
    tareanombre: '',
    tareadescripcion: '',
    // IDproyecto: "",
    tareafechaf: '',
  };

  ngOnInit(): void {
    this.getTareas();
    this.validardatos();
  }

  validardatos() {
    if (this.IDusuarioVD == null) {
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
        title: '¿Estás seguro de querer eliminar esta tarea?',
        text: 'No podrás revertir esta acción.',
        icon: 'warning',
        showCloseButton: true,
        showCancelButton: true,
        confirmButtonText: 'Eliminar',
        cancelButtonText: 'Cancelar',
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          this.tareasS.deleteTarea(IDtareas).subscribe((value) => {
            this.message = value;
            if (this.message.err == false) {
              swalWithBootstrapButtons.fire(
                this.message.message,
                'Se ha eliminado la tarea satisfactoriamente.',
                'success'
              );
              this.ngOnInit();
            }
          });
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithBootstrapButtons.fire(
            'Cancelado',
            'La tarea no se eliminó.',
            'warning'
          );
        }
      });
  }
}
