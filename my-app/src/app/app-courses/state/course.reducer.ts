import { Course } from '../models/course';
import * as CourseActions from './course.actions';

export const initialState: Course[] = [];

export function courseReducer(
  state: Course[] = initialState,
  action: CourseActions.Actions
) {
  switch (action.type) {
    case CourseActions.LOAD_COURSES_COMPLETE:
      state = action.payload;
      return [...state];

    case CourseActions.UPDATE_COURSE:
      var records = state.filter((el) => el.id != action.payload.id);
      var newState = [...records, action.payload];
      return newState;

    case CourseActions.REMOVE_COURSE:
      return state.filter((el) => el.id != action.payload);

    default: {
      return state;
    }
  }
}
