import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { AppState } from '../app.state';
import { AuthState } from '../state/auth.reducer';
import { AuthService } from './auth.service';
import * as AuthActions from '../state/auth.actions';

@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(
    private store: Store<AppState>,
    public authService: AuthService,
    public router: Router
  ) {}
  canActivate(): Observable<boolean> {
    return this.getFromStoreOrAPI().pipe(
      switchMap(() => of(true)),
      catchError(() => of(false))
    );
  }

  getFromStoreOrAPI(): Observable<any> {
    return this.store
      .select((x) => x.authState)
      .pipe(
        tap((authState: AuthState) => {
          if (authState.isAuthenticated) {
            return true;
          } else {
            this.store.dispatch(new AuthActions.Auth_GetAuthInfo());
          }
        })
      );
  }
}
