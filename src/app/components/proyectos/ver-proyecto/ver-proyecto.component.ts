import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-ver-proyecto',
  templateUrl: './ver-proyecto.component.html',
  styleUrls: ['./ver-proyecto.component.css'],
})
export class VerProyectoComponent implements OnInit {
  IDusuario = localStorage.getItem('ID');

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
    if (this.IDusuario == null) {
      this.authservice.logout();
      this.router.navigate(['/auth/login']);
    }
  }

  verProyectos() {
    this.proyectoService.getProyectoAll().subscribe((value) => {
      this.proyectoData = value;
      this.proyectoData = this.proyectoData.rows;
    });
  }
}
