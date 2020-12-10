import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { map, take, tap } from 'rxjs/operators';
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

  constructor(private store: Store<AppState>, public router: Router) {}

  ngOnInit(): void {
    this.store
      .pipe(select((x) => x.authState.isAuthenticated))
      .pipe(take(1))
      .subscribe((isAuthenticated) => {
        if (isAuthenticated) this.router.navigateByUrl('/courses');
      });

    // this.store
    //   .select((x) => x.authState)
    //   .subscribe((data) => {
    //     if (data.isAuthenticated) {
    //       this.router.navigateByUrl('/courses');
    //     }
    //     debugger;
    //     console.log(data);
    //   });
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
