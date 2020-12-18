import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, throwError } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { Course } from '../models/course';
import { CourseService } from '../../services/course.service';
import * as CourseActions from './course.actions';

@Injectable()
export class CourseEffects {
  constructor(
    private actions$: Actions,
    private router: Router,
    private courseService: CourseService
  ) {}

  @Effect()
  loadCourses$: Observable<CourseActions.Actions> = this.actions$.pipe(
    ofType<CourseActions.LoadCourse>(CourseActions.LOAD_COURSES),
    switchMap((action: any) =>
      this.courseService.getCourses(action.payload).pipe(
        map(
          (courses: Course[]) => new CourseActions.LoadCourseComplete(courses)
        ),
        catchError((err) => {
          return throwError(err);
        })
      )
    )
  );

  @Effect({ dispatch: false })
  removeCourse$ = this.actions$.pipe(
    ofType<CourseActions.RemoveCourse>(CourseActions.REMOVE_COURSE),
    switchMap((action: any) =>
      this.courseService.removeCourse(action.payload).pipe(
        tap(() => {
          console.log('Course remove done.');
        }),
        catchError((err) => {
          return throwError(err);
        })
      )
    )
  );

  @Effect({ dispatch: false })
  updateCourse$ = this.actions$.pipe(
    ofType<CourseActions.UpdateCourse>(CourseActions.UPDATE_COURSE),
    switchMap((action: any) =>
      this.courseService.updateCourse(action.payload).pipe(
        tap(() => {
          this.router.navigate(['/courses']);
        }),
        catchError((err) => {
          return throwError(err);
        })
      )
    )
  );

  @Effect({ dispatch: false })
  createCourses$ = this.actions$.pipe(
    ofType<CourseActions.AddCourse>(CourseActions.ADD_COURSE),
    switchMap((action: any) =>
      this.courseService.addCourse(action.payload).pipe(
        tap((action) => {
          this.router.navigate(['/courses']);
        }),
        catchError((err) => {
          return throwError(err);
        })
      )
    )
  );
}
