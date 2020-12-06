import { User } from '../models/user';
import * as AuthActions from './auth.actions';

export const initialUserState: User = {
  id: null,
  name: null,
  login: null,
  password: null,
  fakeToken: null,
  token: null,
};

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  errorMessage: string | null;
}

export const initialState: AuthState = {
  isAuthenticated: false,
  errorMessage: '',
  user: initialUserState,
};

export function authReducer(
  state: AuthState = initialState,
  action: AuthActions.Actions
) {
  switch (action.type) {
    case AuthActions.AUTH_LOGIN_SUCCESS:
      console.log('AUTH_LOGIN_SUCCESS');
      console.log(action.payload);
      state = action.payload;
      return state;

    case AuthActions.SET_AUTH_INFO:
      console.log('SET_AUTH_INFO');
      console.log(action.payload);
      state = action.payload;
      return state;

    case AuthActions.AUTH_LOGIN_FAIL:
      console.log('AUTH_LOGIN_FAIL');
      console.log(action.payload);
      state = initialState;
      return state;

    case AuthActions.REMOVE_AUTH_INFO:
      state = initialState;
      return state;

    default: {
      return state;
    }
  }
}
