import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AuthService } from './auth.service';
import * as AuthActions from '../state/auth.actions';
import { Store } from '@ngrx/store';
import { AppState } from '../app.state';

@Injectable()
export class LoadTokenService implements CanActivate {
  constructor(
    private store: Store<AppState>,
    public authService: AuthService,
    public router: Router
  ) {}
  canActivate(): Observable<boolean> {
    debugger;
    return this.authService.getUserInfoFromServer().pipe(
      map((userData) => {
        this.store.dispatch(
          new AuthActions.Auth_SetAuthInfo({
            errorMessage: null,
            isAuthenticated: true,
            user: userData,
          })
        );

        return true;
      }),
      catchError((err) => {
        console.log(err);
        return of(true);
      })
    );
  }
}
