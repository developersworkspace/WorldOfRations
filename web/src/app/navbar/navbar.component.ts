// Imports
import { Component, OnInit } from '@angular/core';
import { Headers, Http, RequestOptions, Response } from '@angular/http';
import { JwtHelper } from 'angular2-jwt';

// Import RxJs required methods
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

// Imports environment
import { environment } from './../../environments/environment';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {

  public isAuthenticated: boolean;
  public decodedToken: any;

  constructor(private http: Http) { }

  public ngOnInit() {

    const headers = new Headers();

    const jwtToken = localStorage.getItem('jwt.token');
    if (jwtToken != null || jwtToken == '') {
      headers.append('Authorization', 'Bearer ' + jwtToken);
    }

    return this.http.get(`${environment.api.uri}/api/auth/verify`, {
      headers,
    }).map((res: Response) => res).subscribe((result: Response) => {
      if (result.status == 200) {
        this.decodedToken = result.json();
        this.isAuthenticated = true;
      }
    }, (error: Error) => {
      this.decodedToken = null;
      this.isAuthenticated = false;

      if (window.location.pathname != '/login') {
        localStorage.removeItem('jwt.token');
      }
      
    });
  }

  public logout() {
    localStorage.removeItem('jwt.token');
    this.isAuthenticated = localStorage.getItem('jwt.token') != null;
  }
}
