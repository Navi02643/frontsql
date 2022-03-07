import { Component, OnInit } from '@angular/core';

import { UserService } from 'src/app/services/user.service';
import { RolesService } from 'src/app/services/roles.service';
import { ChargesService } from 'src/app/services/charges.service';

import Swal from 'sweetalert2';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-modificarusuario',
  templateUrl: './modificarusuario.component.html',
  styleUrls: ['./modificarusuario.component.css'],
})
export class ModificarusuarioComponent implements OnInit {

  IDusuario=1;
  listaroles: any = [];
  listacargos: any = [];
  editvalue: any=[];
  formulariousuarioedit: FormGroup;
  msg: any = '';

  constructor(
    private userservice: UserService,
    private roleservices: RolesService,
    private chargesservie: ChargesService
  ) {}

  ngOnInit(): void {
    this.createform();
    this.getrole();
    this.getcharge();
  }

  createform(){
  this.formulariousuarioedit = new FormGroup({
    usuarionombres: new FormControl('',Validators.pattern('^[a-zA-Z ]*$')),
      usuarioapellidoP: new FormControl('',Validators.pattern('^[a-zA-Z ]*$')),
      usuarioapellidoM: new FormControl('',Validators.pattern('^[a-zA-Z ]*$')),
      usuarioemail: new FormControl('',Validators.email),
      usuariotelefono: new FormControl('',Validators.pattern('^[0-9]*$')),
      IDrol: new FormControl('',Validators.required),
      IDcargo: new FormControl('',Validators.required),
  });
  }

  getrole(){
    this.roleservices.getrolesACT().subscribe(value=>{
      this.listaroles = value;
    })
  }

  getcharge(){
    this.chargesservie.getcargosACT().subscribe(value=>{
      this.listacargos = value;
    })
  }

  enviar() {
    this.editvalue = this.formulariousuarioedit.value;
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger',
      },
      buttonsStyling: false,
    });
    swalWithBootstrapButtons
      .fire({
        title: '¿Deseas modificar al usuario?',
        text: 'Este cambio no se puede revertir',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Si',
        cancelButtonText: 'No',
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          this.userservice.putdatauser(this.IDusuario,this.editvalue).subscribe((value) => {
            this.msg = value;
            if (this.msg.err == false) {
              swalWithBootstrapButtons.fire(this.msg.msg, '', 'success');
              this.ngOnInit();
            }
          });
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithBootstrapButtons.fire(
            'Cancelado',
            'El usuario no se modifico',
            'warning'
          );
        }
      });
  }
}
