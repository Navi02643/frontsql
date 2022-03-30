import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TareasService } from 'src/app/services/tarea.service';

@Component({
  selector: 'app-tareas-layout',
  templateUrl: './tareas-layout.component.html',
  styleUrls: ['./tareas-layout.component.css'],
})
export class TareasLayoutComponent implements OnInit {
  constructor(private tareasS: TareasService, private router: Router) {}

  // public tareas: Tarea[]=[
  //   new Tarea("Test", "Test")
  // ];
  TareasInfo: any = {
    IDtareas: '',
    IDproyecto: '',
    IDusuario: '',
    // IDestado: "",
    tareanombre: '',
    tareadescripcion: '',
    tareafechaf: '',
  };

  tareadata: any = [];

  CanceladosInfo: any = {
    IDestado: '',
    nombreestatus: '',
  };

  ngOnInit(): void {
    this.getTareas();
    this.verTareasCanceladas();
  }

  getTareas() {
    return this.tareasS.getTareasAll().subscribe((value) => {
      this.TareasInfo = value;
      this.TareasInfo = this.TareasInfo.rows;
    });
  }

  verTareasCanceladas() {
    this.tareasS.getTareaCancel().subscribe((value) => {
      this.CanceladosInfo = value;
      this.CanceladosInfo = this.CanceladosInfo.rows;
    });
  }

  updateTareas(IDtareas: any) {
    localStorage.setItem('IDtareas', IDtareas);
    this.router.navigate(['editarTarea']);
  }

  reactivar(IDtareas: any) {
    this.tareasS.deletereactivar(IDtareas).subscribe((value) => {
      this.ngOnInit();
    });
  }

  eliminar(IDtareas: any) {
    this.tareasS.deleteTarea(IDtareas).subscribe((value) => {
      this.ngOnInit();
    });
  }
}
