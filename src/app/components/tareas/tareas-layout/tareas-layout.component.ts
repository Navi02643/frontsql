import { Component, Input, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { TareasService } from 'src/app/services/tarea.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-tareas-layout',
  templateUrl: './tareas-layout.component.html',
  styleUrls: ['./tareas-layout.component.css'],
})
export class TareasLayoutComponent implements OnInit {
  IDusuarioVD = localStorage.getItem('ID');
  IDrolVD = Number(localStorage.getItem('ROL'));
  IDcargo = Number(localStorage.getItem('CARGO'));

  constructor(
    private tareasS: TareasService,
    private router: Router,
    private authservice: AuthService
  ) {}

  message: any = '';
  // public tareas: Tarea[]=[
  //   new Tarea("Test", "Test")
  // ];
  TareasInfo: any = {
    IDtareas: '',
    IDproyecto: '',
    IDusuario: '',
    // IDestado: "",
    tareanombre: '',
    tareadescripcion: '',
    tareafechaf: '',
  };

  tareadata: any = [];

  CanceladosInfo: any = {
    IDestado: '',
    nombreestatus: '',
  };

  ngOnInit(): void {
    this.getTareas();
    this.verTareasCanceladas();
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
      console.log('Tareas:', value);
    });
  }

  verTareasCanceladas() {
    this.tareasS.getTareaCancel().subscribe((value) => {
      this.CanceladosInfo = value;
      this.CanceladosInfo = this.CanceladosInfo.rows;
      console.log('Tareas Canceladas:', value);
    });
  }

  // reactivar(IDtareas: any) {
  //   this.tareasS.deletereactivar(IDtareas).subscribe((value) => {
  //     this.ngOnInit();
  //   });
  // }

  reactivarTarea(IDtareas: number) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-primary m-10px',
        cancelButton: 'btn btn-danger m-10px',
      },
      buttonsStyling: false,
    });
    swalWithBootstrapButtons
      .fire({
        title: '??Est??s seguro de querer reactivar esta tarea?',
        text: 'No podr??s revertir esta acci??n.',
        icon: 'warning',
        showCloseButton: true,
        showCancelButton: true,
        confirmButtonText: 'Activar',
        cancelButtonText: 'Cancelar',
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          this.tareasS.deletereactivar(IDtareas).subscribe((value) => {
            this.ngOnInit();
            if (this.message.err == false) {
              swalWithBootstrapButtons.fire(
                this.message.message,
                'Se ha reactivado la tarea satisfactoriamente.',
                'success'
              );
              this.ngOnInit();
            }
          });
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithBootstrapButtons.fire(
            'Cancelado',
            'La tarea no se activ??.',
            'warning'
          );
        }
      });
  }

  // eliminar(IDtareas: any) {
  //   this.tareasS.deleteTarea(IDtareas).subscribe((value) => {
  //     this.ngOnInit();
  //   });
  // }

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
        title: '??Est??s seguro de querer eliminar esta tarea?',
        text: 'No podr??s revertir esta acci??n.',
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
            this.ngOnInit();
            if (this.message.err == false) {
              swalWithBootstrapButtons.fire(
                this.message.message,
                'Se ha eliminado la tarea satiscatoriamente.',
                'success'
              );
              this.ngOnInit();
            }
          });
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithBootstrapButtons.fire(
            'Cancelado',
            'La tarea no se elimin??.',
            'warning'
          );
        }
      });
  }

  updateTareas(IDtareas: any) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success m-10px',
        cancelButton: 'btn btn-danger',
      },
      buttonsStyling: false,
    });
    swalWithBootstrapButtons
      .fire({
        title: '??Est?? seguro de querer modificar esta tarea?',
        text: 'No podr??s revertir esta acci??n.',
        icon: 'warning',
        showCloseButton: true,
        showCancelButton: true,
        confirmButtonText: 'Editar',
        cancelButtonText: 'Cancelar',
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          localStorage.setItem('IDtareas', IDtareas);
          this.router.navigate(['editarTarea']);
          console.log('Update tareas:', IDtareas);
          if (this.message.err == false) {
            swalWithBootstrapButtons.fire(
              this.message.message,
              'Se ha modificado la tarea satisfactoriamente.',
              'success'
            );
            this.ngOnInit();
          }
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithBootstrapButtons.fire(
            'Cancelado',
            'La tarea no se mofific??.',
            'warning'
          );
        }
      });
  }
}
