import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { CourseService } from 'src/app/services/course.service';
import { NumberToMinutes } from 'src/app/services/numbertominutes.pipe';
import { UnitTestHelper } from 'src/app/services/unit.test.helper';

import { CourseItemDetailComponent } from './course-item-detail.component';

describe('CourseItemDetailComponent', () => {
  let component: CourseItemDetailComponent;
  let fixture: ComponentFixture<CourseItemDetailComponent>;
  let courseService: CourseService;
  let router: Router;
  let route: ActivatedRoute;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes(
          new UnitTestHelper().injectTestingRoute()
        ),
        FormsModule,
        ReactiveFormsModule,
      ],
      providers: [CourseService, NumberToMinutes],
      declarations: [CourseItemDetailComponent, NumberToMinutes],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseItemDetailComponent);
    component = fixture.componentInstance;
    courseService = TestBed.inject(CourseService);
    router = TestBed.inject(Router);
    route = TestBed.inject(ActivatedRoute);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should do nothing', () => {
    component.ngOnInit();
    component.onItemSelect(null);
    component.OnItemDeSelect(null);
    component.onSelectAll(null);
    component.onDeSelectAll(null);
    expect(true).toBeTrue();
  });

  it('should emit on onCancel', () => {
    component.courseDetail = courseService.getCourse(1);
    component.onCancel();
    expect(true).toBeTrue();
  });

  it('should load course on init', () => {
    const spyRoute = spyOn(route.snapshot.paramMap, 'get');
    spyRoute.and.returnValue('1');
    component = fixture.componentInstance;
    component.ngOnInit();
    fixture.detectChanges();
    expect(component.courseDetail.Id).toBe(1);
  });

  it('should update course', () => {
    component.courseDetail = courseService.getCourse(1);
    component.courseDetail.Title = 'New';
    component.onSave();
    let newCourse = courseService.getCourse(1);
    expect(newCourse.Title).toBe(component.courseDetail.Title);
  });

  it('should create course', () => {
    component.courseDetail = courseService.getCourse(1);
    component.courseDetail.Id = 0;
    let oldCount = courseService.getCourses().length;
    component.onSave();
    let newCount = courseService.getCourses().length;
    expect(oldCount + 1).toEqual(newCount);
  });

  // it('should emit on onSave', () => {
  //   component.courseDetail = courseService.getCourse(1);
  //   spyOn(component.saveChangesEvent, 'emit');
  //   component.onSave();
  //   fixture.detectChanges();
  //   fixture.whenStable().then(() => {
  //     expect(component.saveChangesEvent.emit).toHaveBeenCalled();
  //   });
  // });
});
