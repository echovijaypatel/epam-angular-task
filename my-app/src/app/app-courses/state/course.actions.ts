import { Action } from '@ngrx/store';
import { Course } from '../models/course';
import { CourseSearch } from '../models/courseSearch';

export const LOAD_COURSES = '[Course] Load';
export const LOAD_COURSES_COMPLETE = '[Course] LoadComplete';

export const ADD_COURSE = '[Course] Add';
export const ADD_COURSE_COMPLETE = '[Course] AddComplete';

export const UPDATE_COURSE = '[Course] Update';

export const REMOVE_COURSE = '[Course] Remove';

export class LoadCourse implements Action {
  readonly type = LOAD_COURSES;

  constructor(public payload: CourseSearch) {}
}
export class LoadCourseComplete implements Action {
  readonly type = LOAD_COURSES_COMPLETE;

  constructor(public payload: Course[]) {}
}
export class AddCourse implements Action {
  readonly type = ADD_COURSE;

  constructor(public payload: Course) {}
}
export class AddCourseComplete implements Action {
  readonly type = ADD_COURSE_COMPLETE;

  constructor(public payload: Course) {}
}
export class UpdateCourse implements Action {
  readonly type = UPDATE_COURSE;

  constructor(public payload: Course) {}
}
export class RemoveCourse implements Action {
  readonly type = REMOVE_COURSE;

  constructor(public payload: number) {}
}

export type Actions =
  | LoadCourse
  | LoadCourseComplete
  | AddCourse
  | AddCourseComplete
  | UpdateCourse
  | RemoveCourse
