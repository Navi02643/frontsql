import { Component, OnInit } from '@angular/core';
import { ProjectService } from 'src/app/services/project.service';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registrar-proyecto',
  templateUrl: './registrar-proyecto.component.html',
  styleUrls: ['./registrar-proyecto.component.css']
})
export class RegistrarProyectoComponent implements OnInit {

  usuarios: any = [];

  constructor(private proyectoService: ProjectService, private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.allUsers();
  }

  allUsers() {
    this.userService.getuserall().subscribe((value) => {
      this.usuarios = value;
    });
  }

  crearProyecto(form: { value: any; }):void {
    this.proyectoService.postProyecto(form.value).subscribe(res => {
      Swal.fire({
        icon: 'success',
        title: 'Ready!',
        text: 'Proyecto creado exitosamente',
      })
      this.router.navigateByUrl('/ver-proyecto')
    });
  }

}
