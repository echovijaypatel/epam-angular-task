import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Config } from 'src/environments/config';
import { AppState } from '../app.state';
import { LoginRequest } from '../models/loginrequest';
import { TokenRequest } from '../models/tokenrequest';
import { User } from '../models/user';
import * as AuthActions from '../state/auth.actions';
import { AuthState } from '../state/auth.reducer';

@Injectable({ providedIn: 'root' })
export class AuthService {
  username: string = '';
  config = new Config();

  constructor(
    private store: Store<AppState>,
    public router: Router,
    private http: HttpClient
  ) {}

  login(loginRequest: LoginRequest): Observable<TokenRequest> {
    return this.http.post<TokenRequest>(
      this.config.apiUrl + '/auth/login',
      loginRequest
    );
  }

  getUserInfo(): Observable<AuthState> {
    return this.store.select((state) => state.authState);
  }

  getUserInfoFromServer(): Observable<User> {
    var token = localStorage.getItem('token') || '';
    var tokenRequest: TokenRequest = { token: token };
    return this.http.post<User>(
      this.config.apiUrl + '/auth/userinfo',
      tokenRequest
    );
  }

  logout() {
    this.store.dispatch(new AuthActions.Auth_RemoveAuthInfo());
    localStorage.setItem('username', '');
    localStorage.setItem('token', '');
    this.username = '';
  }

  processLoginSuccess(tokenRequest: TokenRequest): Observable<User> {
    return this.http.post<User>(
      this.config.apiUrl + '/auth/userinfo',
      tokenRequest
    );
  }
}
