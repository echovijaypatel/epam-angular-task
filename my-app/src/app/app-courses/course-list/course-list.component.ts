import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CourseService } from 'src/app/services/course.service';
import { Course } from '../models/course';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css'],
})
export class CourseListComponent implements OnInit {
  start: number = 0;
  end: number = 1;
  batchSize: number = 1;
  sortKey: string = 'date desc';
  searchStr: string = '';

  courses: Course[] = [];

  constructor(public router: Router, private courseService: CourseService) {}

  ngOnInit(): void {
    this.getCourses();
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
  // ngOnChanges(changes: SimpleChanges) {
  //   if (
  //     changes &&
  //     changes.courseItemsOverview &&
  //     changes.courseItemsOverview.currentValue
  //   )
  //     this.courseItemsOverviewFiltered =
  //       changes.courseItemsOverview.currentValue;
  // }

  addNewCourse() {
    this.router.navigate(['/courses/new']);
  }

  searchCourse() {
    this.start = 0;
    this.end = 1;
    this.getCourses();
  }

  editCourse(id) {
    this.router.navigate(['/courses/' + id]);
  }

  deleteCourse(id) {
    if (confirm('Are you sure to delete?')) {
      this.courseService.deleteCourse(id)
      .subscribe(
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
