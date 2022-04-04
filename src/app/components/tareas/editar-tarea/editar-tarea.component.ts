import { Component, OnInit, Input } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { TareasService } from 'src/app/services/tarea.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editar-tarea',
  templateUrl: './editar-tarea.component.html',
  styleUrls: ['./editar-tarea.component.css'],
})
export class EditarTareaComponent implements OnInit {
  message: any = '';
  FormEditTarea: FormGroup;
  IDtareas = Number(localStorage.getItem('IDtareas'));
  IDusuarioVD = localStorage.getItem('ID');
  IDrolVD = Number(localStorage.getItem('ROL'));
  IDcargo = Number(localStorage.getItem('CARGO'));

  TareasInfo: any = {
    IDusuario: '',
    tareanombre: '',
    tareadescripcion: '',
    tareafechaf: '',
  };

  constructor(
    private tareasS: TareasService,
    private route: ActivatedRoute,
    private router: Router,
    private authservice: AuthService
  ) {}

  ngOnInit(): void {
    this.getTareas();
    this.createform();
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

  createform() {
    this.FormEditTarea = new FormGroup({
      tareanombre: new FormControl('', Validators.pattern('^[a-zA-Z ]*$')),
      tareadescripcion: new FormControl('', Validators.pattern('^[a-zA-Z ]*$')),
      tareafechaf: new FormControl(''),
    });
  }

  confirmUpdateTareas() {
    this.TareasInfo = this.FormEditTarea.value;
    this.tareasS;
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
                swalWithBootstrapButtons.fire(
                  this.message.message,
                  'Se ha ha modificado la tarea satisfactoriamente.',
                  'success'
                );
                localStorage.removeItem('IDtareas');
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
