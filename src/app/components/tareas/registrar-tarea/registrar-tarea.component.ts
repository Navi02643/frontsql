import { Component, OnInit } from '@angular/core';
import { TareasService } from 'src/app/services/tarea.service';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-registrar-tarea',
  templateUrl: './registrar-tarea.component.html',
  styleUrls: ['./registrar-tarea.component.css']
})
export class RegistrarTareaComponent implements OnInit {

  usuarios: any = [];
  proyectos: any = [];

  constructor(
    private tareasService: TareasService,
    private userService: UserService,
    private proyectoService: ProjectService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.allUsers();
    this.allprojects()
  }

  allUsers() {
    this.userService.getuserall().subscribe((value) => {
      this.usuarios = value;
    });
  }

  allprojects(){
    this.proyectoService.getProyectoAll().subscribe(value=>{
      this.proyectos = value;
      this.proyectos = this.proyectos.rows
      console.log(this.proyectos);

    })
  }

  registrarTarea(form: {value: any;}):void {
    console.log(form.value);

    if(form.value.IDusuario == ""){
      Swal.fire({
        icon: 'warning',
        title: 'upps',
        text: 'Debes seleccionar el Usuario'
      })
      return
    }
    if(form.value.tareanombre == ""){
      Swal.fire({
        icon: 'warning',
        title: 'upps',
        text: 'Debes rellenar el Nombre'
      })
      return
    }
    if(form.value.IDproyecto == ""){
      Swal.fire({
       icon: 'warning',
       title: 'upps',
       text: 'Debes seleccionar el proyecto'
     })
     return
   }
    if(form.value.tareafechaf == ""){
      Swal.fire({
        icon: 'warning',
        title: 'upps',
        text: 'Debes seleccionar la fecha de entrega'
      })
      return
    }

    this.tareasService.postTarea(form.value).subscribe(res => {
      Swal.fire({
        icon: 'success',
        title: 'Ready!',
        text: '¡Tarea registrada satisfactoriamente!.',
      })
      this.router.navigateByUrl('/tareasLayout')
    })
    console.log(form.value)
  }
}
