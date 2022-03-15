import { Component, OnInit } from '@angular/core';
import { ProjectService } from 'src/app/services/project.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-eliminar-proyecto',
  templateUrl: './eliminar-proyecto.component.html',
  styleUrls: ['./eliminar-proyecto.component.css']
})
export class EliminarProyectoComponent implements OnInit {

  msg: any = '';

  constructor(private proyectoService: ProjectService, private router: Router ) { }

  proyectoData: any={
    IDproyecto: "",
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

  deleteProyecto(IDproyecto: number){
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger',
      },
      buttonsStyling: false,
    });
    swalWithBootstrapButtons
      .fire({
        title: '¿Quieres eliminar este Proyecto?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Si',
        cancelButtonText: 'No',
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          this.proyectoService.deleteProyecto(IDproyecto).subscribe((value) => {
            this.msg = value;
            if (this.msg.err == false) {
              swalWithBootstrapButtons.fire(this.msg.msg, '', 'success');
              this.ngOnInit();
            }
          });
        }
    })
  }
  

}
