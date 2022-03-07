import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-eliminarusuario',
  templateUrl: './eliminarusuario.component.html',
  styleUrls: ['./eliminarusuario.component.css']
})
export class EliminarusuarioComponent implements OnInit {

  listainactivos: any = [];
  SA: any ="";
  msg: any="";
  constructor(private userservice: UserService) { }

  ngOnInit(): void {
    this.listaINA();
  }

  listaINA(){
    this.userservice.getuserINA().subscribe((value)=>{
      this.listainactivos = value;
      this.SA=this.listainactivos.SA;
    })
  }

  borrarINA(IDusuario: number){
    this.userservice.deleteuserINA(IDusuario).subscribe(value=>{
      this.msg = value;
      if(this.msg.err == false){
        window.location.reload();
      }
    })
  }

  reactivarINA(IDusuario: number){
    this.userservice.deleteREAC(IDusuario).subscribe(value=>{
      this.msg = value;
      if(this.msg.err == false){
        window.location.reload();
      }
    });
  }

}
