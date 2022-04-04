import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup, NumberValueAccessor, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
  IDtareas  = Number(localStorage.getItem('IDtareas'));


  // IDtareas: number;
  // Tareas: tareas;

  TareasInfo: any = {
    IDusuario: "",
    tareanombre: "",
    tareadescripcion: "",
    tareafechaf: "",
  };

  constructor(
    private tareasS: TareasService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getTareas();
    this.createform();
    console.log(this.IDtareas)
  }

  getTareas() {
    return this.tareasS.getTareasAll().subscribe(value => {
      this.TareasInfo = value;
      this.TareasInfo = this.TareasInfo.rows;
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
    this.tareasS
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
              if (this.message.err == false) {
                swalWithBootstrapButtons.fire(this.message.message, 'Se ha ha modificado la tarea satisfactoriamente.', 'success');
                localStorage.removeItem("IDtareas")
                this.router.navigate(['tareasLayout']);
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
