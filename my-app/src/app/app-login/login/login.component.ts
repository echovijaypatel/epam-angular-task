import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { tap } from 'rxjs/operators';
import { AppState } from 'src/app/app.state';
import { LoginRequest } from 'src/app/models/loginrequest';
import { AuthService } from 'src/app/services/auth.service';
import { Auth_DoLogin } from 'src/app/state/auth.actions';
import { AuthState } from 'src/app/state/auth.reducer';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  username: string = 'Morales';
  password: string = 'id';
  errorMsg: string = '';

  constructor(
    private store: Store<AppState>,
    private authService: AuthService,
    public router: Router
  ) {}

  ngOnInit(): void {
    debugger;
    this.authService.getUserInfo().subscribe((result) => {
      if (result.isAuthenticated) this.router.navigateByUrl('/courses');
    });
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
