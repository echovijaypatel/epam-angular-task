import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { CourseService } from 'src/app/services/course.service';
import { NumberToMinutes } from 'src/app/services/numbertominutes.pipe';

import { CourseItemDetailComponent } from './course-item-detail.component';

describe('CourseItemDetailComponent', () => {
  let component: CourseItemDetailComponent;
  let fixture: ComponentFixture<CourseItemDetailComponent>;
  let courseService: CourseService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, FormsModule, ReactiveFormsModule],
      providers: [CourseService, NumberToMinutes],
      declarations: [CourseItemDetailComponent, NumberToMinutes],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseItemDetailComponent);
    component = fixture.componentInstance;
    courseService = TestBed.inject(CourseService);
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

  it('should emit on onSave', () => {
    component.courseDetail = courseService.getCourse(1);
    spyOn(component.saveChangesEvent, 'emit');
    component.onSave();
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(component.saveChangesEvent.emit).toHaveBeenCalled();
    });
  });
});
