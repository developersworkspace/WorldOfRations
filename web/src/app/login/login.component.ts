import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { environment } from './../../environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      if (params['token'] == null) {
        let redirectUrl = environment.oauth.google.uri;

        redirectUrl += '?client_id=' + environment.oauth.google.clientId + '&redirect_uri=' + environment.oauth.google.redirectUri;

        window.location.href = redirectUrl;
      } else {
        localStorage.setItem('jwt.token', params['token']);
        window.location.href = '/';
      }
    });
  }
}
