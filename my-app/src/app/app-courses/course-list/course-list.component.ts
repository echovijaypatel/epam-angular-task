import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { Router } from '@angular/router';
import { CourseService } from 'src/app/services/course.service';
import { Course } from '../models/course';
import { CourseListFilter } from './course-list.filter.pipe';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CourseListComponent implements OnInit {
  searchStr: string;
  courseItemsOverviewFiltered: Course[];
  courseItemsOverview: Course[];

  constructor(public router: Router, private courseService: CourseService) {}

  ngOnInit(): void {
    this.refreshList(this.courseService.getCourses());
  }

  ngOnChanges(changes: SimpleChanges) {
    if (
      changes &&
      changes.courseItemsOverview &&
      changes.courseItemsOverview.currentValue
    )
      this.courseItemsOverviewFiltered =
        changes.courseItemsOverview.currentValue;
  }

  addNewCourse() {
    this.router.navigate(['/courses/new']);
  }

  searchCourse() {
    const courseListFilter = new CourseListFilter();
    this.courseItemsOverviewFiltered = courseListFilter.transform(
      this.courseItemsOverview,
      this.searchStr
    );
  }

  editCourse(id) {
    this.router.navigate(['/courses/' + id]);
  }

  deleteCourse(id) {
    if (confirm('Are you sure to delete?')) {
      this.refreshList(this.courseService.deleteCourse(id));
    }
  }

  refreshList(data) {
    this.courseItemsOverview = data;
    this.courseItemsOverviewFiltered = data;
  }
}
