import { Component, Input, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { TareasService } from 'src/app/services/tarea.service';

@Component({
  selector: 'app-tareas-layout',
  templateUrl: './tareas-layout.component.html',
  styleUrls: ['./tareas-layout.component.css'],
})
export class TareasLayoutComponent implements OnInit {
  constructor(private tareasS: TareasService, private router: Router) { }

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
  }

  getTareas() {
    return this.tareasS.getTareasAll().subscribe((value) => {
      this.TareasInfo = value;
      this.TareasInfo = this.TareasInfo.rows;
      console.log('Tareas:', value)
    });
  }

  verTareasCanceladas() {
    this.tareasS.getTareaCancel().subscribe((value) => {
      this.CanceladosInfo = value;
      this.CanceladosInfo = this.CanceladosInfo.rows;
      console.log('Tareas Canceladas:', value)
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
        title: '¿Estás seguro de querer reactivar esta tarea?',
        text: "No podrás revertir esta acción.",
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
              swalWithBootstrapButtons.fire(this.message.message, 'Se ha reactivado la tarea satisfactoriamente.', 'success');
              this.ngOnInit();
            }
          });
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithBootstrapButtons.fire(
            'Cancelado',
            'La tarea no se activó.',
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
        title: '¿Estás seguro de querer eliminar esta tarea?',
        text: "No podrás revertir esta acción.",
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
              swalWithBootstrapButtons.fire(this.message.message, 'Se ha eliminado la tarea satiscatoriamente.', 'success');
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
        title: '¿Está seguro de querer modificar esta tarea?',
        text: "No podrás revertir esta acción.",
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
          console.log('Update tareas:', IDtareas)
          if (this.message.err == false) {
            swalWithBootstrapButtons.fire(this.message.message, 'Se ha modificado la tarea satisfactoriamente.', 'success');
            this.ngOnInit();
          }
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithBootstrapButtons.fire(
            'Cancelado',
            'La tarea no se mofificó.',
            'warning'
          );
        }
      });
  }
}
