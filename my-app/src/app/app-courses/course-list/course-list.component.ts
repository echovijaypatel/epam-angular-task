import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { CourseService } from 'src/app/services/course.service';
import { Course } from '../models/course';
import { User } from '../models/user';
import { CourseListFilter } from './course-list.filter.pipe';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CourseListComponent implements OnInit {
  isAddingNewCourse: boolean;
  searchStr: string;
  courseItemsOverviewFiltered: Course[];
  courseItemsOverview: Course[];
  dropdownSettings: IDropdownSettings = {};
  courseDetail: Course;
  authors: User[];
  @Output() showHideFormEvent = new EventEmitter<boolean>();

  constructor(private courseService: CourseService) {}

  ngOnInit(): void {
    this.refreshList(this.courseService.getCourses());
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
    this.isAddingNewCourse = true;
  }

  searchCourse() {
    const courseListFilter = new CourseListFilter();
    this.courseItemsOverviewFiltered = courseListFilter.transform(
      this.courseItemsOverview,
      this.searchStr
    );
  }

  editCourse(id) {
    this.courseDetail = this.courseService.getCourse(id);
    this.isAddingNewCourse = true;
  }

  deleteCourse(id) {
    if (confirm('Are you sure to delete?')) {
      this.refreshList(this.courseService.deleteCourse(id));
    }
  }

  saveChanges(courseDetail: Course) {
    if (courseDetail.Id > 0) {
      this.refreshList(this.courseService.updateCourse(courseDetail));
    } else {
      this.refreshList(this.courseService.addCourse(courseDetail));
    }
    this.isAddingNewCourse = false;
  }

  cancelSaveEdit() {
    this.isAddingNewCourse = false;
  }

  refreshList(data) {
    this.courseItemsOverview = data;
    this.courseItemsOverviewFiltered = data;
  }
}
