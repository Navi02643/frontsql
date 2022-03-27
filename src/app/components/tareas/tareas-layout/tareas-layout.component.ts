import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TareasService } from 'src/app/services/tarea.service';


@Component({
  selector: 'app-tareas-layout',
  templateUrl: './tareas-layout.component.html',
  styleUrls: ['./tareas-layout.component.css']
})
export class TareasLayoutComponent implements OnInit {

  constructor(
    private tareasS: TareasService,
    private router: Router
  ) { }

// public tareas: Tarea[]=[
//   new Tarea("Test", "Test")
// ];

TareasInfo: any={
  IDtareas: "",
  IDproyecto: "",
  IDusuario: "",
  // IDestado: "",
  tareanombre: "",
  tareadescripcion: "",
  tareafechaf: "",
};

CanceladosInfo: any = {
  IDestado: "",
  nombreestatus: "",
}

  ngOnInit(): void {
    this.getTareas();
    this.verTareasCanceladas();
    console.log('TareasInfo:',this.TareasInfo);
  }


  getTareas() {
    return this.tareasS.getTareasAll().subscribe(value => {
      this.TareasInfo=value;
      this.TareasInfo=this.TareasInfo.rows;
      console.log('Tareas obtenidas:',value)
    });
  }

  verTareasCanceladas() {
    this.tareasS.getTareaCancel().subscribe((value) => {
      this.CanceladosInfo = value;
      this.CanceladosInfo = this.CanceladosInfo.rows;
      console.log('Tareas canceladas:', value);
    });
  }

  updateTareas(IDtareas: number){
    this.router.navigate(['editarTarea', IDtareas]);
  }
}
