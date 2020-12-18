import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, throwError } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { User } from '../models/user';
import { AuthService } from '../services/auth.service';
import * as AuthActions from './auth.actions';
import { AuthState } from './auth.reducer';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private router: Router,
    private authService: AuthService
  ) {}

  @Effect()
  doLogin$: Observable<AuthActions.Actions> = this.actions$.pipe(
    ofType<AuthActions.Auth_DoLogin>(AuthActions.AUTH_LOGIN),
    switchMap((action: any) =>
      this.authService.login(action.payload).pipe(
        switchMap((tokenRequest) =>
          this.authService.processLoginSuccess(tokenRequest).pipe(
            map(
              (user: User) =>
                new AuthActions.Auth_LoginSuccess({
                  errorMessage: null,
                  isAuthenticated: true,
                  user: user,
                })
            ),
            catchError((err) => {
              let authData: AuthState = {
                errorMessage: null,
                isAuthenticated: null,
                user: null,
              };
              new AuthActions.Auth_LoginFail(authData);
              return throwError(err);
            })
          )
        ),
        catchError((err) => {
          let authData: AuthState = {
            errorMessage: null,
            isAuthenticated: null,
            user: null,
          };
          new AuthActions.Auth_LoginFail(authData);
          return throwError(err);
        })
      )
    )
  );

  @Effect({ dispatch: false })
  onLoginSuccess$ = this.actions$.pipe(
    ofType<AuthActions.Auth_LoginSuccess>(AuthActions.AUTH_LOGIN_SUCCESS),
    tap((action) => {
      localStorage.setItem('token', action.payload.user.fakeToken);
      this.router.navigate(['/courses']);
    })
  );

  @Effect()
  getAuthInfo$: Observable<AuthActions.Actions> = this.actions$.pipe(
    ofType<AuthActions.Auth_GetAuthInfo>(AuthActions.GET_AUTH_INFO),
    switchMap((action: any) =>
      this.authService.getUserInfoFromServer().pipe(
        map(
          (user: User) =>
            new AuthActions.Auth_SetAuthInfo({
              errorMessage: null,
              isAuthenticated: true,
              user: user,
            })
        ),
        catchError((err) => {
          let authData: AuthState = {
            errorMessage: null,
            isAuthenticated: null,
            user: null,
          };
          new AuthActions.Auth_LoginFail(authData);
          return throwError(err);
        })
      )
    )
  );
}
