import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subject, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { AppState } from 'src/app/app.state';
import { CourseService } from 'src/app/services/course.service';
import { Course } from '../models/course';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css'],
})
export class CourseListComponent implements OnInit, OnDestroy {
  start: number = 0;
  end: number = 1;
  batchSize: number = 1;
  sortKey: string = 'date desc';
  searchStr: string = '';
  subscription = new Subscription();
  searchTextChanged = new Subject<string>();
  courses: Course[] = [];
  coursesFromStore: Observable<Course[]>;

  constructor(
    private store: Store<AppState>,
    public router: Router,
    private courseService: CourseService
  ) {
    this.coursesFromStore = store.select('courses');
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.getCourses();
    this.subscription = this.searchTextChanged
      .pipe(debounceTime(1000))
      .subscribe((data) => {
        console.log('Search-' + data);
        this.start = 0;
        this.end = 1;
        this.searchStr = data;
        this.getCourses();
      });
  }

  getCourses() {
    this.courseService
      .getCourses(this.start, this.end, this.sortKey, this.searchStr)
      .subscribe(
        (data) => {
          this.refreshList(data);
        },
        (err) => {
          console.log(err);
        }
      );
  }

  loadMore() {
    this.end = this.end + this.batchSize;
    this.getCourses();
  }

  addNewCourse() {
    this.router.navigate(['/courses/new']);
  }

  searchCourse($event) {
    var inputValue: string = $event.target.value;
    if (inputValue.length > 2 || inputValue.length == 0)
      this.searchTextChanged.next(inputValue);
  }

  editCourse(id) {
    this.router.navigate(['/courses/' + id]);
  }

  deleteCourse(id) {
    if (confirm('Are you sure to delete?')) {
      this.courseService.deleteCourse(id).subscribe(
        (data) => {
          this.getCourses();
        },
        (err) => {
          console.log(err);
        }
      );
    }
  }

  refreshList(data) {
    this.courses = data;
  }
}
