import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(public authService: AuthService, public router: Router) {}
  canActivate(): Observable<boolean> {
    return this.authService.getUserInfo().pipe(
      map((userData) => {
        if (!userData && !userData.fakeToken) {
          this.router.navigateByUrl('/login');
          return false;
        }
        return true;
      }),
      catchError((err) => {
        this.router.navigateByUrl('/login');
        return of(false);
      })
    );
  }
}
