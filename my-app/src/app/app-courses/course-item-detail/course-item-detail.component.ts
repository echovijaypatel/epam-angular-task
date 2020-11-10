import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { Course } from '../models/course';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { CourseService } from 'src/app/services/course.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { NgDynamicBreadcrumbService } from 'ng-dynamic-breadcrumb';
import { Author } from '../models/author';

@Component({
  selector: 'app-course-item-detail',
  templateUrl: './course-item-detail.component.html',
  styleUrls: ['./course-item-detail.component.css'],
})
export class CourseItemDetailComponent implements OnInit {
  courseDetail: Course;
  dropdownSettings: IDropdownSettings = {};
  allAuthors: Author[];
  errorMessage: string;

  constructor(
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
    // this.setBreadcrumb('');

    let courseId = this.route.snapshot.paramMap.get('id');

    this.courseService.getAllAuthors().subscribe(
      (data) => {
        this.allAuthors = data;
        this.loadCourse(courseId);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  private setBreadcrumb(title:string) {
    const breadcrumb = {
      customText: '',
      dynamicText: title,
    };
    this.ngDynamicBreadcrumbService.updateBreadcrumbLabels(breadcrumb);
  }

  private loadCourse(courseId: string) {
    if (courseId) {
      this.courseService.getCourse(courseId).subscribe(
        (data) => {
          this.courseDetail = data;
          this.setBreadcrumb(this.courseDetail.name);
        },
        (err) => {
          console.log(err);
        }
      );
    } else {
      this.courseDetail = {
        id: 0,
        name: '',
        description: '',
        length: 10,
        isTopRated: false,
        date: new Date(),
        authors: []
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
    if (this.courseDetail.id > 0) {
      this.courseService.updateCourse(this.courseDetail).subscribe(
        (data) => {
          this.router.navigate(['/courses']);
        },
        (err) => {
          console.log(err);
        }
      );
    } else {
      this.courseService.addCourse(this.courseDetail).subscribe(
        (data) => {
          this.router.navigate(['/courses']);
        },
        (err) => {
          console.log(err);
        }
      );
    }
  }

  onCancel() {
    this.router.navigate(['/courses']);
  }
}
