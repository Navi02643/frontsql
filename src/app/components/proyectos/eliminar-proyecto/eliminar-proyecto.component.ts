import { Component, OnInit } from '@angular/core';
import { ProjectService } from 'src/app/services/project.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-eliminar-proyecto',
  templateUrl: './eliminar-proyecto.component.html',
  styleUrls: ['./eliminar-proyecto.component.css']
})
export class EliminarProyectoComponent implements OnInit {

  msg: any = '';
  usuarios: any = [];
  estados: any = [];
  proyectos: any;
  formProyectoEdit: FormGroup;

  constructor(private proyectoService: ProjectService, private userService: UserService, private router: Router ) { }

  actualizar: boolean = false
  actualizar2: boolean = false
  
  IDproyecto: any= "";
  proyectoEdit: any = [];
  proyectoEdit2: any = [];
 

  proyectoData: any={
    IDproyecto: "",
    proyectonombre: "",
    proyectodescripcion: "",
    nombreestatus: "",
    nombre: "",
  };

  proyectoDataCANCEL: any={
    IDproyecto: "",
    proyectonombre: "",
    proyectodescripcion: "",
    nombreestatus: "",
    nombre: "",
  };

  ngOnInit() {
    this.verProyectosCANCEL();
    this.verProyectos();
    this.allUsers();
    this.formProyecto();
    this.allStatus();
  }

  allUsers() {
    this.userService.getuserENC().subscribe((value) => {
      this.usuarios = value;
    });
  }

  allStatus() {
    this.proyectoService.getStatus().subscribe((value) => {
      this.estados = value;
    });
  }


  formProyecto() {
    this.formProyectoEdit = new FormGroup({
      proyectonombre: new FormControl(''),
      proyectodescripcion: new FormControl(''),
      IDusuario: new FormControl(''),
      IDestado: new FormControl(''),
    });
  }

  verProyectosCANCEL(){
    this.proyectoService.getProyectoCANCEL().subscribe(value=> {
      this.proyectoDataCANCEL = value;
      this.proyectoDataCANCEL = this.proyectoDataCANCEL.rows;
    })
  }

  verProyectos(){
    this.proyectoService.getProyectoAll().subscribe(value=> {
      this.proyectoData = value;
      this.proyectoData = this.proyectoData.rows;
      console.log(this.proyectoData)
    })
  }

  obtenerProyecto(IDproyecto: number){
    this.proyectoService.seleccionar(IDproyecto).subscribe(value => {
    this.proyectoData = value;
    console.log(value);
    this.proyectoData = this.proyectoData.rows;
    this.actualizar = true;
    console.log(this.proyectoData[0].IDproyecto);
    console.log(this.proyectoData[0].nombre);
    })
  }

  obtenerProyectoCANCEL(IDproyecto: number){
    this.proyectoService.seleccionar(IDproyecto).subscribe(value => {
    this.proyectoDataCANCEL = value;
    console.log(value);
    this.proyectoDataCANCEL = this.proyectoDataCANCEL.rows;
    this.actualizar2 = true;
    console.log(this.proyectoDataCANCEL[0].IDproyecto);
    console.log(this.proyectoDataCANCEL[0].nombre);
    })
  }
  
  volver(){
    window.location.reload();
  }

  modificarProyecto(){
    this.proyectoEdit = this.formProyectoEdit.value
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger',
      },
      buttonsStyling: false,
    });
    swalWithBootstrapButtons
      .fire({
        title: '¿Quieres modificar este Proyecto?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Si',
        cancelButtonText: 'No',
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          this.proyectoService.putProyecto(this.proyectoData[0].IDproyecto, this.proyectoEdit)
          .subscribe((value) => {
            console.log(this.proyectoEdit);
            this.msg = value;
            window.location.reload();
            if (this.msg.err == false) {
              swalWithBootstrapButtons.fire(this.msg.msg, '', 'success');
              this.ngOnInit();
            }
          });
        }
    })
  }

  modificarProyectoCANCEL(){
    this.proyectoEdit2 = this.proyectoDataCANCEL.value
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger',
      },
      buttonsStyling: false,
    });
    swalWithBootstrapButtons
      .fire({
        title: '¿Quieres modificar este Proyecto?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Si',
        cancelButtonText: 'No',
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          this.proyectoService.putProyectoCANCEL(this.proyectoDataCANCEL[0].IDproyecto, this.proyectoEdit2)
          .subscribe((value) => {
            console.log(this.proyectoEdit2);
            this.msg = value;
            window.location.reload();
            if (this.msg.err == false) {
              swalWithBootstrapButtons.fire(this.msg.msg, '', 'success');
              this.ngOnInit();
            }
          });
        }
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
