import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthService {
  username: string = '';

  login(username: string) {
    localStorage.setItem('username', username);
    this.username = username;
    return this.username;
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
