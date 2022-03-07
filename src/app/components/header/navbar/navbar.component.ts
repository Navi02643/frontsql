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
  IDusuario = localStorage.getItem('ID');
  IDcargo = Number(localStorage.getItem('CARGO'))

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.validardatos();
  }

  validardatos(){
    if(this.IDusuario == null){
      this.router.navigate(['/auth/login']);
    }
  }

  logout(){
    this.authService.logout();
    this.router.navigateByUrl('/auth/login')
  }

}
