import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CourseService } from 'src/app/services/course.service';
import { NumberToMinutes } from 'src/app/services/numbertominutes.pipe';
import { CourseListComponent } from './course-list.component';
import { CourseListOrder } from './course-list.order.pipe';
import { SimpleChanges } from '@angular/core';
import { CourseListFilter } from './course-list.filter.pipe';
import { RouterTestingModule } from '@angular/router/testing';
import { UnitTestHelper } from 'src/app/services/unit.test.helper';
describe('CourseListComponent', () => {
  let component: CourseListComponent;
  let fixture: ComponentFixture<CourseListComponent>;
  let courseService: CourseService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes(
          new UnitTestHelper().injectTestingRoute()
        ),
      ],
      providers: [CourseService, NumberToMinutes],
      declarations: [
        CourseListComponent,
        NumberToMinutes,
        CourseListOrder,
        CourseListFilter,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseListComponent);
    component = fixture.componentInstance;
    courseService = TestBed.inject(CourseService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should init', () => {
    component.ngOnInit();
  });

  it('search course', () => {
    component.searchCourse();
  });

  it('should call ngOnChanges', () => {
    let changes: SimpleChanges = {
      courseItemsOverview: {
        firstChange: null,
        previousValue: null,
        isFirstChange: null,
        currentValue: courseService.getCourses(),
      },
    };
    component.ngOnChanges(changes);
  });

  it('should add course', () => {
    component.addNewCourse();
  });

  it('should edit course', () => {
    component.editCourse(1);
  });

  it('should delete course', () => {
    spyOn(window, 'confirm').and.callFake(function () {
      return true;
    });
    component.deleteCourse(1);
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      var checkDeleted = courseService.getCourse(1);
      expect(checkDeleted).toBeNull();
    });
  });

  // it('should save new course', () => {
  //   var courses = courseService.getCourses().length;
  //   var course = courseService.getCourse(1);
  //   course.Id = 0;
  //   component.saveChanges(course);
  //   var newCourses = courseService.getCourses().length;
  //   expect(newCourses).toBeGreaterThan(courses);
  // });

  // it('should edit course', () => {
  //   var course = courseService.getCourse(1);
  //   var newTitle = 'New Title';
  //   course.Title = newTitle;
  //   component.saveChanges(course);
  //   var course = courseService.getCourse(1);
  //   expect(course.Title).toEqual(newTitle);
  // });

  // it('Cancel save-edit course', () => {
  //   component.cancelSaveEdit();
  //   expect(component.isAddingNewCourse).toBeFalsy();
  // });
});
