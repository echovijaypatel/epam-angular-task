import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  username: string;
  constructor(
    private router: Router,
    private authService: AuthService,
    private translate: TranslateService
  ) {}

  ngOnInit(): void {
    this.authService.getUserInfo().subscribe(
      (result) => {
        if (result && result.user && result.user.name)
          this.username = result.user.name.first + ' ' + result.user.name.last;
      },
      (error) => {
        this.authService.logout();
      }
    );
  }

  changeLanguage(value) {
    if (value == 'English') {
      this.translate.use('en');
    } else {
      this.translate.use('fr');
    }
  }

  onLogout() {
    console.log('(logout) - ' + this.username);
    this.username = '';
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }
}
