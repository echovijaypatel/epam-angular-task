import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  username: string;
  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.getUserInfo().subscribe(
      (result) => {
        this.username = result.name.first + ' ' + result.name.last;
      },
      (error) => {
        this.authService.logout();
      }
    );
  }

  onLogout() {
    console.log('(logout) - ' + this.username);
    this.username = '';
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }
}
