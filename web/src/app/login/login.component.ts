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
        let redirectUrl = environment.oauth.uri;

        redirectUrl += '?response_type=token&client_id=' + environment.oauth.clientId + '&redirect_uri=' + environment.oauth.redirectUri + '&scope=read';

        window.location.href = redirectUrl;
      } else {
        localStorage.setItem('jwt.token', params['token']);
        window.location.href = '/';
      }
    });
  }
}
