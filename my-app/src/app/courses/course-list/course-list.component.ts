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
  isAddingNewCourse: boolean;
  courseItemsOverview: Course[];

  constructor(private router: Router, private courseService: CourseService) {}

  ngOnInit(): void {
    this.courseItemsOverview = this.courseService.getCourses();
    console.log('courseItemsOverview');
    console.log(this.courseItemsOverview);
  }

  addNewCourse() {
    this.isAddingNewCourse = true;
    this.router.navigateByUrl('/courses/new');
  }

  editCourse(index) {
    this.isAddingNewCourse = true;
    this.router.navigateByUrl('/courses/edit/' + index);
  }
  deleteCourse(index) {
    if (confirm('Are you sure to delete?')) {
      this.courseItemsOverview = this.courseService.deleteCourse(index);
    }
  }
}
