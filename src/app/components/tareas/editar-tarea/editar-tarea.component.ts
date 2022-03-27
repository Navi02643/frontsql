import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { tareas } from 'src/app/models/tareas';
import { TareasService } from 'src/app/services/tarea.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editar-tarea',
  templateUrl: './editar-tarea.component.html',
  styleUrls: ['./editar-tarea.component.css']
})
export class EditarTareaComponent implements OnInit {


  message: any = '';
  FormEditTarea: FormGroup;
  IDtareas = localStorage.getItem('IDtareas');


  // IDtareas: number;
  // Tareas: tareas;
  
  TareasInfo: any = {
    IDtareas: "",
    // IDproyecto: "",
    IDusuario: "",
    // IDestado: "",
    tareanombre: "",
    tareadescripcion: "",
    // IDproyecto: "",
    tareafechaf: "",
    tareas: ""
  };

  constructor(
    private tareasS: TareasService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.getTareas();
    this.createform();
    console.log('TareasInfo:', this.TareasInfo)
  }


  getTareas() {
    return this.tareasS.getTareasAll().subscribe(value => {
      this.TareasInfo = value;
      this.TareasInfo = this.TareasInfo.rows;
      console.log('Tareas registradas:', value)
    });
  }

  createform() {
    this.FormEditTarea = new FormGroup({
      tareanombre: new FormControl('', Validators.pattern('^[a-zA-Z ]*$')),
      tareadescripcion: new FormControl('', Validators.pattern('^[a-zA-Z ]*$')),
      tareafechaf: new FormControl(''),
    });
  }

  confirmUpdateTareas() {
    // this.IDtareas = this.route.snapshot.params['IDtareas'];
    // this.tareasS.getTareaById(this.IDtareas).subscribe(value => {
    //   this.Tareas;
    //   console.log('Update:', value)
    // })
    this.TareasInfo = this.FormEditTarea.value;
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger',
      },
      buttonsStyling: false,
    });
    swalWithBootstrapButtons
      .fire({
        title: '¿Deseas modificar esta tarea?',
        text: 'No podrás revertir esta acción.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Modificar',
        cancelButtonText: 'Cancelar',
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          this.tareasS
            .putEditarTarea(this.IDtareas, this.TareasInfo)
            .subscribe((value) => {
              this.message = value;
              console.log('Update:', value);
              if (this.message.err == false) {
                swalWithBootstrapButtons.fire(this.message.message, 'Se ha ha modificado la tarea satisfactoriamente.', 'success');
                this.ngOnInit();
              }
            });
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithBootstrapButtons.fire(
            'Cancelado',
            'La tarea no se modificó.',
            'warning'
          );
        }
      });
  }
}
