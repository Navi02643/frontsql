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
    this.authService.login(form.value).subscribe(res => {
      if(res!=null) {
        this.router.navigateByUrl('/inicio')
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Verifica los campos ingresados',
        })
      }
    });
  }

}
