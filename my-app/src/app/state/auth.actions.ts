import { Action } from '@ngrx/store';
import { LoginRequest } from '../models/loginrequest';
import { AuthState } from './auth.reducer';

export const AUTH_LOGIN = '[AUTH] Login';
export const AUTH_LOGIN_SUCCESS = '[AUTH] Add';
export const AUTH_LOGIN_FAIL = '[AUTH] Fail';

export const GET_AUTH_INFO = '[AUTH] Get';
export const SET_AUTH_INFO = '[AUTH] Set';

export const REMOVE_AUTH_INFO = '[AUTH] Remove';

export class Auth_DoLogin implements Action {
  readonly type = AUTH_LOGIN;

  constructor(public payload: LoginRequest) {}
}

export class Auth_LoginSuccess implements Action {
  readonly type = AUTH_LOGIN_SUCCESS;

  constructor(public payload: AuthState) {}
}

export class Auth_LoginFail implements Action {
  readonly type = AUTH_LOGIN_FAIL;

  constructor(public payload: AuthState) {}
}

export class Auth_GetAuthInfo implements Action {
  readonly type = GET_AUTH_INFO;

  constructor() {}
}

export class Auth_SetAuthInfo implements Action {
  readonly type = SET_AUTH_INFO;

  constructor(public payload: AuthState) {}
}

export class Auth_RemoveAuthInfo implements Action {
  readonly type = REMOVE_AUTH_INFO;

  constructor() {}
}

export type Actions =
  | Auth_DoLogin
  | Auth_LoginSuccess
  | Auth_LoginFail
  | Auth_GetAuthInfo
  | Auth_SetAuthInfo
  | Auth_RemoveAuthInfo;
