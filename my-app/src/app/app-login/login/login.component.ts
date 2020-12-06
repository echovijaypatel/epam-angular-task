import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { LoginRequest } from 'src/app/models/loginrequest';
import { AuthService } from 'src/app/services/auth.service';
import { Auth_DoLogin } from 'src/app/state/auth.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  username: string = 'Morales';
  password: string = 'id';
  errorMsg: string = '';

  constructor(private store: Store<AppState>, public router: Router) {}

  ngOnInit(): void {
    // if (this.authService.isAuthenticated()) {
    //   this.router.navigateByUrl('/courses');
    // }
  }

  onLogin() {
    //   this.authService
    //     .login({
    //       login: this.username,
    //       password: this.password,
    //     })
    //     .subscribe(
    //       (result) => {
    //         this.authService.processLoginSuccess(result);
    //       },
    //       (error) => {
    //         this.errorMsg = error.error;
    //       }
    //     );

    const loginRequest: LoginRequest = {
      login: this.username,
      password: this.password,
    };
    this.store.dispatch(new Auth_DoLogin(loginRequest));
  }
}
