import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isAuthenticated: boolean;

  constructor() { }

  ngOnInit() {
    this.isAuthenticated = localStorage.getItem('jwt.token') != null;
  }

  logout() {
    localStorage.removeItem('jwt.token');
    this.isAuthenticated = localStorage.getItem('jwt.token') != null;
  }
}
