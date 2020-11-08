import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  username: string = 'Morales';
  password: string = 'id';
  errorMsg: string = '';

  constructor(public router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    if (this.authService.isAuthenticated()) {
      this.router.navigateByUrl('/courses');
    }
  }

  onLogin() {
    this.authService
      .login({
        login: this.username,
        password: this.password,
      })
      .subscribe(
        (result) => {
          this.authService.processLoginSuccess(result);
        },
        (error) => {
          this.errorMsg = error.error;
        }
      );
  }
}
