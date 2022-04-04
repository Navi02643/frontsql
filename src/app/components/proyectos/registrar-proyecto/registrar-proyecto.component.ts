import { Component, OnInit } from '@angular/core';
import { ProjectService } from 'src/app/services/project.service';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-registrar-proyecto',
  templateUrl: './registrar-proyecto.component.html',
  styleUrls: ['./registrar-proyecto.component.css'],
})
export class RegistrarProyectoComponent implements OnInit {
  usuarios: any = [];
  formProyecto: FormGroup;
  IDusuario = localStorage.getItem('ID');
  IDcargo = Number(localStorage.getItem('CARGO'));

  constructor(
    private proyectoService: ProjectService,
    private userService: UserService,
    private router: Router,
    private authservice: AuthService
  ) {}

  ngOnInit(): void {
    this.allUsers();
    this.FormProyecto();
    this.validardatos();
  }

  validardatos() {
    if (this.IDusuario == null || this.IDcargo != 7) {
      this.authservice.logout();
      this.router.navigate(['/auth/login']);
    }
  }

  allUsers() {
    this.userService.getuserENC().subscribe((value) => {
      this.usuarios = value;
    });
  }

  FormProyecto() {
    this.formProyecto = new FormGroup({
      proyectonombre: new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-zA-Z ]*$'),
      ]),
      proyectodescripcion: new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-zA-Z ]*$'),
      ]),
      IDusuario: new FormControl('', [Validators.required]),
    });
  }

  crearProyecto(form: { value: any }): void {
    this.proyectoService.postProyecto(form.value).subscribe((res) => {
      Swal.fire({
        showCloseButton: true,
        icon: 'success',
        title: 'Ready!',
        text: 'Proyecto creado exitosamente',
      });
      this.router.navigateByUrl('/ver-proyecto');
    });
  }
}
