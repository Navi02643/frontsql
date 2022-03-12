import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  userInfo: any = [];
  

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.userInfo = localStorage.getItem("USERNAME");
    console.log("User Logueado: ",this.userInfo);
  }

  logout(){
    this.authService.logout();
    Swal.fire({
      icon: 'success',
      title: 'Sesion Cerrada',
      text: 'Hasta pronto',
    })
    this.router.navigateByUrl('/login')
  }

}
