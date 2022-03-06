import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserI } from 'src/app/models/user';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  constructor(private authService: AuthService, private router: Router) { }

  user: UserI = new UserI();
  
  ngOnInit() {
  }

  onLogin(form: { value: any; }): void {
    console.log(this.user);
    this.authService.login(form.value).subscribe(res => {
      console.log('login', form.value)
      if(res!=null) {
        Swal.fire({
          icon: 'success',
          title: 'Sesion',
          text: 'Exitosa',
        })
        this.router.navigateByUrl('/auth')
      } else {
        console.log('error');
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Verifica los campos ingresados',
        })
      }
    });
  }

}
