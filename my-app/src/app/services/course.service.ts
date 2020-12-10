import { Injectable } from '@angular/core';
import { Author } from '../app-courses/models/author';
import { HttpClient } from '@angular/common/http';
import { Course } from '../app-courses/models/course';
import { Config } from 'src/environments/config';
import { Observable } from 'rxjs';
import { LoadingService } from '../app-shared/loading/loading.service';
import { CourseSearch } from '../app-courses/models/courseSearch';

@Injectable({ providedIn: 'root' })
export class CourseService {
  private config = new Config();

  constructor(private http: HttpClient) {}

  getAllAuthors(): Observable<Author[]> {
    return this.http.get<Author[]>(this.config.apiUrl + '/authors');
  }

  getCourses(courseSearch: CourseSearch): Observable<Course[]> {
    return this.http.get<Course[]>(
      this.config.apiUrl +
        '/courses?start=' +
        courseSearch.start +
        '&count=' +
        courseSearch.maxcount +
        '&sort=' +
        courseSearch.sort +
        '&textFragment=' +
        courseSearch.search
    );
  }

  updateCourse(course: Course): Observable<Course> {
    return this.http.patch<Course>(
      this.config.apiUrl + '/courses/' + course.id,
      course
    );
  }

  removeCourse(id): Observable<object> {
    return this.http.delete(this.config.apiUrl + '/courses/' + id);
  }

  addCourse(course: Course): Observable<Course> {
    return this.http.post<Course>(this.config.apiUrl + '/courses', course);
  }
}
