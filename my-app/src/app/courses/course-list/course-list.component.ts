import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css'],
})
export class CourseListComponent implements OnInit {
  isAddingNewCourse: boolean;

  constructor(private router: Router) {}

  ngOnInit(): void {}

  addNewCourse() {
    this.isAddingNewCourse = true;
    this.router.navigateByUrl('/courses/new');
  }

  editCourse() {}
}
