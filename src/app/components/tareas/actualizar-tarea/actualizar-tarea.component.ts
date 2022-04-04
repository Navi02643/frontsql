import { Component, OnInit } from '@angular/core';
import { TareasService } from 'src/app/services/tarea.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-actualizar-tarea',
  templateUrl: './actualizar-tarea.component.html',
  styleUrls: ['./actualizar-tarea.component.css']
})
export class ActualizarTareaComponent implements OnInit {

  message: any = '';

  constructor(
    private router:Router,
    private tareasS: TareasService
  ) { }

  TareasInfo: any={
    IDtareas: "",
    // IDproyecto: "",
    IDusuario: "",
    // IDestado: "",
    tareanombre: "",
    tareadescripcion: "",
    // IDproyecto: "",
    tareafechaf: ""
  };

  ngOnInit(): void {
    this.getTareas();
    console.log(this.TareasInfo)
  }

  getTareas() {
    return this.tareasS.getTareasAll().subscribe(value => {
      this.TareasInfo=value;
      this.TareasInfo=this.TareasInfo.rows;
      console.log(value)
    });
  }deleteTarea(IDtareas: number) {
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
        text: "No podrás revertir esta acción o al menos de que la vuelvas a modificar.",
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
              swalWithBootstrapButtons.fire(this.message.message, '', 'success');
              this.ngOnInit();
            }
          });
        }
      });
  }
}
