import { Course } from '../app-courses/models/course';
import * as CourseActions from './course.actions';

export const initialState: Course[] = [
  {
    id: 1,
    name: 'Test',
    authors: [],
    date: new Date(),
    description: '',
    isTopRated: false,
    length: 20,
  },
];

export function courseReducer(
  state: Course[] = initialState,
  action: CourseActions.Actions
) {
  switch (action.type) {
    case CourseActions.ADD_COURSE:
      return [...state, action.payload];

    case CourseActions.REMOVE_COURSE:
      return [...state, action.payload];

    default: {
      return state;
    }
  }
}
