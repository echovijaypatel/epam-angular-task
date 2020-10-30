import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { CourseService } from 'src/app/services/course.service';
import { NumberToMinutes } from 'src/app/services/numbertominutes.pipe';
import { CourseListComponent } from './course-list.component';
import { CourseListOrder } from './course-list.order.pipe';

describe('CourseListComponent', () => {
  let component: CourseListComponent;
  let fixture: ComponentFixture<CourseListComponent>;
  let courseService: CourseService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [CourseService, NumberToMinutes],
      declarations: [CourseListComponent, NumberToMinutes, CourseListOrder],
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

  it('should emit edit event', () => {
    spyOn(component.editCourseEvent, 'emit');
    component.editCourse(1);
    expect(component.editCourseEvent.emit).toHaveBeenCalled();
  });

  it('should emit delete event', () => {
    spyOn(component.deleteCourseEvent, 'emit');
    component.deleteCourse(1);
    expect(component.deleteCourseEvent.emit).toHaveBeenCalled();
  });
});
