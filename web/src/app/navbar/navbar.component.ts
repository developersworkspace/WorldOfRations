import { Component, OnInit } from '@angular/core';
import { JwtHelper } from 'angular2-jwt';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isAuthenticated: boolean;
  decodedToken: any;

  constructor() { }

  ngOnInit() {
    this.decodedToken = localStorage.getItem('jwt.token') != null? new JwtHelper().decodeToken(localStorage.getItem('jwt.token')) : null;
    this.isAuthenticated = localStorage.getItem('jwt.token') != null;
  }

  logout() {
    localStorage.removeItem('jwt.token');
    this.isAuthenticated = localStorage.getItem('jwt.token') != null;
  }
}
