import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseService } from 'src/app/services/course.service';
import { Course } from '../models/course';
import { IDropdownSettings } from 'ng-multiselect-dropdown';

@Component({
  selector: 'app-course-item-detail',
  templateUrl: './course-item-detail.component.html',
  styleUrls: ['./course-item-detail.component.css'],
})
export class CourseItemDetailComponent implements OnInit {
  courseDetail: Course;
  errorMessage: string;
  dropdownSettings: IDropdownSettings = {};

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private courseService: CourseService
  ) {}

  ngOnInit(): void {
    debugger;
    if (this.router.url.includes('/courses/edit')) {
      this.courseDetail = this.courseService.getCourse(
        this.route.snapshot.params.id
      );
    }

    if (this.courseDetail == null || this.courseDetail.Id < 1) {
      this.courseDetail = {
        Id: 0,
        Title: '',
        Description: '',
        Duration: 10,
        CreationDate: new Date(),
        SelectedAuthors: [],
        Authors: this.courseService.getAllAuthors(),
      };
    }

    this.dropdownSettings = {
      singleSelection: false,
      idField: 'Id',
      textField: 'FirstName',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true,
    };
  }

  onItemSelect(item: any) {
    console.log(item);
  }

  OnItemDeSelect(item: any) {
    console.log(item);
  }

  onSelectAll(items: any) {
    console.log(items);
  }

  onDeSelectAll(items: any) {
    console.log(items);
  }

  onSave() {
    debugger;
    if (this.courseDetail.Id > 0) {
      console.log('Updating ' + this.courseDetail.Id);
      this.courseService.updateCourse(this.courseDetail);
    } else {
      console.log('adding');
      this.courseService.addCourse(this.courseDetail);
    }

    this.router.navigateByUrl('/courses');
  }

  onCancel() {
    this.router.navigateByUrl('/courses');
  }
}
