import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Course } from '../models/course';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { User } from '../models/user';
import { CourseService } from 'src/app/services/course.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { NgDynamicBreadcrumbService } from 'ng-dynamic-breadcrumb';

@Component({
  selector: 'app-course-item-detail',
  templateUrl: './course-item-detail.component.html',
  styleUrls: ['./course-item-detail.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CourseItemDetailComponent implements OnInit {
  courseDetail: Course;
  dropdownSettings: IDropdownSettings = {};
  authors: User[];
  errorMessage: string;

  constructor(
    public router: Router,
    public route: ActivatedRoute,
    private ngDynamicBreadcrumbService: NgDynamicBreadcrumbService,
    private courseService: CourseService
  ) {
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'Id',
      textField: 'FirstName',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true,
    };
    this.authors = this.courseService.getAllAuthors();
  }

  ngOnInit(): void {
    let courseId = this.route.snapshot.paramMap.get('id');
    this.loadCourse(courseId);
    this.setBreadcrumb();
  }

  private setBreadcrumb() {
    const breadcrumb = {
      customText: '',
      dynamicText: this.courseDetail.Title,
    };
    this.ngDynamicBreadcrumbService.updateBreadcrumbLabels(breadcrumb);
  }

  private loadCourse(courseId: string) {
    if (courseId) {
      this.courseDetail = this.courseService.getCourse(courseId);
    } else {
      this.courseDetail = {
        Id: 0,
        Title: '',
        Description: '',
        Duration: 10,
        IsTopRated: false,
        CreationDate: new Date(),
        SelectedAuthors: [],
        Authors: this.courseService.getAllAuthors(),
      };
    }
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
    if (this.courseDetail.Id > 0) {
      this.courseService.updateCourse(this.courseDetail);
    } else {
      this.courseService.addCourse(this.courseDetail);
    }
    this.router.navigate(['/courses']);
  }

  onCancel() {
    this.router.navigate(['/courses']);
  }
}
