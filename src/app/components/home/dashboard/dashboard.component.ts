import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { empty } from 'rxjs/internal/observable/empty';
import { ProjectService } from 'src/app/services/project.service';
import { TareasService } from 'src/app/services/tarea.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  IDusuario= localStorage.getItem("ID");
  divamostras = 0;
  proyectonombretarea:any = [];
  listaproyectos: any = []
  listatareas: any = []
  listaestados: any= []
  formularioestado: FormGroup;
  estado:any;
  IDtarea:any;
  IDproyecto: any

  constructor(private proyectoService: ProjectService,private tareaService: TareasService) { }

  ngOnInit(): void {
    this.obtenerproyectosusuario();
    this.obtenerestados();
    this.crearform();

  }

  crearform() {
    this.formularioestado = new FormGroup({
      estado: new FormControl('', Validators.required),
    });
  }

  obtenerproyectosusuario(){
    this.proyectoService.getProyectoUSER(this.IDusuario).subscribe(value=>{
      this.listaproyectos = value;
      this.listaproyectos = this.listaproyectos.rows
    })
  }

  obtenertareasproyecto(IDproyecto: any){
    this.IDproyecto = IDproyecto;
    this.tareaService.gettareaproyecto(this.IDusuario,IDproyecto).subscribe(value=>{
      this.listatareas = value
      this.listatareas = this.listatareas.rows
      if(this.listatareas.length <= 0){
        this.divamostras = 1;
      } else {
        this.divamostras = 2;
      }
    })
    this.proyectoService.getProyectoESP(IDproyecto).subscribe(value=>{
      this.proyectonombretarea = value;
      this.proyectonombretarea = this.proyectonombretarea.rows;
      this.proyectonombretarea = this.proyectonombretarea[0].proyectonombre
    })
  }

  obtenerestados(){
    this.proyectoService.getStatus().subscribe(value=>{
      this.listaestados = value;
      this.listaestados = this.listaestados.rows
    })
  }

  obtenerrespuesta(IDtareas: any){
    this.estado = this.formularioestado.value;
    this.tareaService.putestado(IDtareas, this.estado).subscribe(value=>{
      this.obtenertareasproyecto(this.IDproyecto);
    })
  }

}
