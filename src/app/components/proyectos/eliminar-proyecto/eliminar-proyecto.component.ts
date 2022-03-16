import { Component, OnInit } from '@angular/core';
import { ProjectService } from 'src/app/services/project.service';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-eliminar-proyecto',
  templateUrl: './eliminar-proyecto.component.html',
  styleUrls: ['./eliminar-proyecto.component.css'],
})
export class EliminarProyectoComponent implements OnInit {
  msg: any = '';
  SA = 0;
  IDusuario = localStorage.getItem('ID');
  IDrolLS = Number(localStorage.getItem('CARGO'));

  constructor(
    private proyectoService: ProjectService,
    private router: Router,
    private authservice: AuthService
  ) {}

  proyectoData: any = {
    IDproyecto: '',
    proyectonombre: '',
    proyectodescripcion: '',
    nombreestatus: '',
    nombre: '',
  };

  ngOnInit() {
    this.verProyectos();
    this.validardatos();
  }

  validardatos() {
    if (this.IDusuario == null || this.IDrolLS != 1) {
      this.authservice.logout();
      this.router.navigate(['/auth/login']);
    }
  }

  verProyectos() {
    this.proyectoService.getProyectocancel().subscribe((value) => {
      this.proyectoData = value;
      this.SA = this.proyectoData.SA;
      this.proyectoData = this.proyectoData.rows;
      console.log(this.proyectoData);
      console.log(this.SA);
    });
  }

  deleteProyecto(IDproyecto: number) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger',
      },
      buttonsStyling: false,
    });
    swalWithBootstrapButtons
      .fire({
        title: '¿Quieres eliminar este Proyecto?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Si',
        cancelButtonText: 'No',
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          this.proyectoService.deleteProyecto(IDproyecto).subscribe((value) => {
            this.msg = value;
            if (this.msg.err == false) {
              swalWithBootstrapButtons.fire(this.msg.msg, '', 'success');
              this.ngOnInit();
            }
          });
        }
      });
  }
}
