import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import * as CourseActions from '../app-courses/state/course.actions';
import { Store } from '@ngrx/store';
import { AppState } from '../app.state';
import { CourseService } from './course.service';
import { CourseSearch } from '../app-courses/models/courseSearch';

@Injectable()
export class LoadCoursesService implements CanActivate {
  constructor(
    private store: Store<AppState>,
    public courseService: CourseService,
    public router: Router
  ) {}
  canActivate(): Observable<boolean> {
    var search: CourseSearch = {
      start: 0,
      maxcount: 1,
      sort: 'date desc',
      search: '',
    };
    return this.courseService.getCourses(search).pipe(
      map((courses) => {
        this.store.dispatch(
          new CourseActions.LoadCourseComplete(courses)
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
