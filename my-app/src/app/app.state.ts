import { Course } from './app-courses/models/course';
import { AuthState } from './state/auth.reducer';

export interface AppState {
  readonly courses: Course[];
  readonly authState: AuthState;
}
