import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-course-item-detail',
  templateUrl: './course-item-detail.component.html',
  styleUrls: ['./course-item-detail.component.css']
})
export class CourseItemDetailComponent implements OnInit {
  title: string;
  description: string;
  duration: string;
  date: string;
  authors: string;
  errorMessage: string;

  constructor(private router: Router) {}

  ngOnInit(): void {}

  onSave() {
    console.log(this.title);
    console.log(this.description);
    console.log(this.duration);
    console.log(this.date);
    console.log(this.authors);
    this.router.navigateByUrl('/courses');
  }

  onCancel() {
    this.router.navigateByUrl('/courses');
  }
}
