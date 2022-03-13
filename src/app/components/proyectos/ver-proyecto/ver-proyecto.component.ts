import { Component, OnInit } from '@angular/core';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-ver-proyecto',
  templateUrl: './ver-proyecto.component.html',
  styleUrls: ['./ver-proyecto.component.css']
})
export class VerProyectoComponent implements OnInit {


  constructor(private proyectoService: ProjectService ) { }

  proyectoData: any={
    proyectonombre: "",
    proyectodescripcion: "",
    nombreestatus: "",
    nombre: "",
  };

  ngOnInit() {
    this.verProyectos();
  }


  verProyectos(){
    this.proyectoService.getProyectoAll().subscribe(value=> {
      this.proyectoData = value;
      this.proyectoData = this.proyectoData.rows;
    })
  }
  

}
