import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Config } from 'src/environments/config';
import { LoginRequest } from '../models/loginrequest';
import { TokenRequest } from '../models/tokenrequest';
import { User } from '../models/user';

@Injectable({ providedIn: 'root' })
export class AuthService {
  username: string = '';
  config = new Config();

  constructor(public router: Router, private http: HttpClient) {}

  login(loginRequest: LoginRequest): any {
    return this.http.post<TokenRequest>(
      this.config.apiUrl + '/auth/login',
      loginRequest
    );
  }

  processLoginSuccess(tokenRequest: TokenRequest) {
    this.http
      .post<User>(this.config.apiUrl + '/auth/userinfo', tokenRequest)
      .subscribe(
        (result) => {
          localStorage.setItem(
            'username',
            result.name.first + ' ' + result.name.last
          );
          this.router.navigateByUrl('/courses');
        },
        (error) => {
          console.log(error);
        }
      );
  }

  logout() {
    localStorage.setItem('username', '');
    this.username = '';
  }

  isAuthenticated() {
    this.username = localStorage.getItem('username') || '';
    return this.username != '';
  }

  getUserInfo() {
    this.username = localStorage.getItem('username') || '';
    return this.username;
  }
}
