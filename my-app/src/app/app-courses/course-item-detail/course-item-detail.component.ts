import { Component, OnInit } from '@angular/core';
import { Course } from '../models/course';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { CourseService } from 'src/app/services/course.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { NgDynamicBreadcrumbService } from 'ng-dynamic-breadcrumb';
import { Author } from '../models/author';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import * as selectors from '../state/course.selectors';
import { AddCourse, UpdateCourse } from '../state/course.actions';

@Component({
  selector: 'app-course-item-detail',
  templateUrl: './course-item-detail.component.html',
  styleUrls: ['./course-item-detail.component.css'],
})
export class CourseItemDetailComponent implements OnInit {
  courseId: number;
  courseDetail: Course;
  dropdownSettings: IDropdownSettings = {};
  allAuthors: Author[];
  errorMessage: string;

  constructor(
    private store: Store<AppState>,
    public router: Router,
    public route: ActivatedRoute,
    private ngDynamicBreadcrumbService: NgDynamicBreadcrumbService,
    private courseService: CourseService
  ) {
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true,
    };
  }

  ngOnInit(): void {
    this.courseId = parseInt(this.route.snapshot.paramMap.get('id'));
    this.courseService.getAllAuthors().subscribe(
      (data) => {
        this.allAuthors = data;
        this.loadCourse();
      },
      (err) => {
        console.log(err);
      }
    );
  }

  private setBreadcrumb(title: string) {
    const breadcrumb = {
      customText: '',
      dynamicText: title,
    };
    this.ngDynamicBreadcrumbService.updateBreadcrumbLabels(breadcrumb);
  }

  private loadCourse() {
    if (this.courseId) {
      this.store
        .select(selectors.getItemById(this.courseId))
        .subscribe((item: Course) => {
          this.courseDetail = {
            id: item.id,
            name: item.name,
            description: item.description,
            length: item.length,
            isTopRated: item.isTopRated,
            date: item.date,
            authors: item.authors,
          };
          this.setBreadcrumb(this.courseDetail.name);
        });
    } else {
      this.courseDetail = {
        id: 0,
        name: '',
        description: '',
        length: 10,
        isTopRated: false,
        date: new Date(),
        authors: [],
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
    //Format dd/MM/yyyy
    var dateParts = this.courseDetail.date.toString().split('/');
    // month is 0-based, that's why we need dataParts[1] - 1
    var dateObject = new Date(
      parseInt(dateParts[2]),
      parseInt(dateParts[1]) - 1,
      parseInt(dateParts[0])
    );

    var course: Course = {
      id: this.courseDetail.id,
      name: this.courseDetail.name,
      date: dateObject,
      length: this.courseDetail.length,
      description: this.courseDetail.description,
      authors: this.courseDetail.authors,
      isTopRated: this.courseDetail.isTopRated,
    };
    if (this.courseDetail.id > 0) {
      this.store.dispatch(new UpdateCourse(course));
    } else {
      this.store.dispatch(new AddCourse(course));
    }
  }

  onCancel() {
    this.router.navigate(['/courses']);
  }
}
