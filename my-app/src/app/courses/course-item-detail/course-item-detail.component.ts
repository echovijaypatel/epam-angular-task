import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseService } from 'src/app/services/course.service';
import { Course } from '../models/course';

@Component({
  selector: 'app-course-item-detail',
  templateUrl: './course-item-detail.component.html',
  styleUrls: ['./course-item-detail.component.css'],
})
export class CourseItemDetailComponent implements OnInit {
  courseDetail: Course;
  errorMessage: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private courseService: CourseService
  ) {}

  ngOnInit(): void {
    if (this.router.url.includes('/courses/edit')) {
      console.log(this.route.snapshot.params.id);
      console.log(this.router.url);
      this.courseDetail = this.courseService.getCourse(
        this.route.snapshot.params.id
      );
    } else {
      this.courseDetail = {
        Id: 0,
        Title: '',
        Description: '',
        Duration: '',
        CreationDate: new Date(),
        SelectedAuthors: [],
        Authors: [],
      };
    }
  }

  onSave() {
    console.log(this.courseDetail.Title);
    console.log(this.courseDetail.Description);
    console.log(this.courseDetail.Duration);
    console.log(this.courseDetail.CreationDate);
    console.log(this.courseDetail.Authors);
    this.courseService.addCourse(this.courseDetail);
    this.router.navigateByUrl('/courses');
  }

  onCancel() {
    this.router.navigateByUrl('/courses');
  }
}
