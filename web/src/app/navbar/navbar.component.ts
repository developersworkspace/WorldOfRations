// Imports
import { Component, OnInit } from '@angular/core';
import { JwtHelper } from 'angular2-jwt';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

// Imports environment
import { environment } from './../../environments/environment';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isAuthenticated: boolean;
  decodedToken: any;

  constructor(private http: Http) { }

  ngOnInit() {


    let headers = new Headers();

    let jwtToken = localStorage.getItem('jwt.token');
    if (jwtToken != null || jwtToken == '') {
      headers.append('Authorization', 'Bearer ' + jwtToken);
    }

    return this.http.get(`${environment.api.uri}/api/auth/verify`, {
      headers: headers
    }).map((res: Response) => res).subscribe((result: Response) => {
      if (result.status == 200) {
        this.decodedToken = result.json();
        this.isAuthenticated = true;
      } else {
        this.decodedToken = null;
        this.isAuthenticated = false;
        localStorage.removeItem('jwt.token');
      }
    })
  }

  logout() {
    localStorage.removeItem('jwt.token');
    this.isAuthenticated = localStorage.getItem('jwt.token') != null;
  }
}
