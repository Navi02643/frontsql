import { Component, OnInit } from '@angular/core';
import { TareasService } from 'src/app/services/tarea.service';


@Component({
  selector: 'app-tareas-layout',
  templateUrl: './tareas-layout.component.html',
  styleUrls: ['./tareas-layout.component.css']
})
export class TareasLayoutComponent implements OnInit {

// public tareas: Tarea[]=[
//   new Tarea("Test", "Test")
// ];
TareasInfo: any={
    IDtareas: "",
    // IDproyecto: "",
    IDusuario: "",
    // IDestado: "",
    tareanombre: "",
    tareadescripcion: "",
    tareaproyecto: "",
    tareafechaf: ""
};

  constructor(
    private tareasS: TareasService,

  ) { }

  ngOnInit(): void {
    this.getTareas();
  }


  getTareas() {
    return this.tareasS.getTareasAll().subscribe(value => {
      this.TareasInfo=value;
      this.TareasInfo=this.TareasInfo.rows;
    });
  }
}
