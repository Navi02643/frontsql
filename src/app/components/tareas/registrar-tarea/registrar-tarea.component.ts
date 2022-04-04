import { Component, OnInit } from '@angular/core';
import { TareasService } from 'src/app/services/tarea.service';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ProjectService } from 'src/app/services/project.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-registrar-tarea',
  templateUrl: './registrar-tarea.component.html',
  styleUrls: ['./registrar-tarea.component.css'],
})
export class RegistrarTareaComponent implements OnInit {
  usuarios: any = [];
  proyectos: any = [];
  IDusuario = localStorage.getItem('ID');
  IDcargo = Number(localStorage.getItem('CARGO'));
  IDusuarioget: number;

  constructor(
    private tareasService: TareasService,
    private userService: UserService,
    private proyectoService: ProjectService,
    private router: Router,
    private authservice: AuthService
  ) {}

  ngOnInit(): void {
    this.allUsers();
    this.validardatos();
  }

  validardatos() {
    if (this.IDusuario == null || this.IDcargo != 7) {
      this.authservice.logout();
      this.router.navigate(['/auth/login']);
    }
  }

  allUsers() {
    this.userService.getuserall().subscribe((value) => {
      this.usuarios = value;
    });
  }

  capturar(){
    this.allprojects()
  }

  allprojects() {
    this.proyectoService.getProyectoUSER(this.IDusuarioget).subscribe((value) => {
      this.proyectos = value;
      this.proyectos = this.proyectos.rows;
    });
  }

  registrarTarea(form: { value: any }): void {
    if (form.value.IDusuario == '') {
      Swal.fire({
        icon: 'warning',
        title: 'upps',
        text: 'Debes seleccionar el Usuario',
      });
      return;
    }
    if (form.value.tareanombre == '') {
      Swal.fire({
        icon: 'warning',
        title: 'upps',
        text: 'Debes rellenar el Nombre',
      });
      return;
    }
    if (form.value.IDproyecto == '') {
      Swal.fire({
        icon: 'warning',
        title: 'upps',
        text: 'Debes seleccionar el proyecto',
      });
      return;
    }
    if (form.value.tareafechaf == '') {
      Swal.fire({
        icon: 'warning',
        title: 'upps',
        text: 'Debes seleccionar la fecha de entrega',
      });
      return;
    }

    this.tareasService.postTarea(form.value).subscribe((res) => {
      Swal.fire({
        icon: 'success',
        title: 'Ready!',
        text: '¡Tarea registrada satisfactoriamente!.',
      });
      this.router.navigateByUrl('/tareasLayout');
    });
  }
}
