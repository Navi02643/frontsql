import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  userInfo: any = [];
  IDusuario = localStorage.getItem('ID');
  IDrol = Number(localStorage.getItem('ROL'));
  IDCargo = Number(localStorage.getItem('CARGO'));

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.userInfo = localStorage.getItem('USERNAME');
  }

  logout() {
    this.authService.logout();
    this.router.navigateByUrl('/auth/login');
  }
}
