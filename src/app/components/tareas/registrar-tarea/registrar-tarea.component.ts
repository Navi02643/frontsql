import { Component, OnInit } from '@angular/core';
import { TareasService } from 'src/app/services/tarea.service';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registrar-tarea',
  templateUrl: './registrar-tarea.component.html',
  styleUrls: ['./registrar-tarea.component.css']
})
export class RegistrarTareaComponent implements OnInit {

  usuarios: any = [];

  constructor( 
    private tareasService: TareasService, 
    private userService: UserService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.allUsers();
  }

  allUsers() {
    this.userService.getuserall().subscribe((value) => {
      this.usuarios = value;
    });
  }

  registrarTarea(form: {value: any;}):void {
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
