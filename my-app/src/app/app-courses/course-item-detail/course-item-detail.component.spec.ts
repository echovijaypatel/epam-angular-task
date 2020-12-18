import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { CourseService } from 'src/app/services/course.service';
import { NumberToMinutes } from 'src/app/services/numbertominutes.pipe';
import { UnitTestHelper } from 'src/app/services/unit.test.helper';
import { Location } from '@angular/common';
import { CourseItemDetailComponent } from './course-item-detail.component';

describe('CourseItemDetailComponent', () => {
  let component: CourseItemDetailComponent;
  let fixture: ComponentFixture<CourseItemDetailComponent>;
  let courseService: CourseService;
  let location: Location;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CourseItemDetailComponent, NumberToMinutes],
      imports: [
        RouterTestingModule.withRoutes(UnitTestHelper.injectTestingRoute()),
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
      ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get(): string {
                  return UnitTestHelper.testRouteValue;
                },
              },
            },
          },
        },
        CourseService,
        NumberToMinutes,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseItemDetailComponent);
    component = fixture.componentInstance;
    courseService = TestBed.inject(CourseService);
    router = TestBed.inject(Router);
    location = TestBed.inject(Location);
    router.initialNavigation();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load authors', () => {
    component.ngOnInit();
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(component.allAuthors).toBeDefined();
    });
  });

  it('should load course', () => {
    UnitTestHelper.testRouteValue = '8693';
    component.ngOnInit();
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(component.allAuthors).toBeDefined();
    });
  });

  it('should do nothing', () => {
    component.ngOnInit();
    component.onItemSelect(null);
    component.OnItemDeSelect(null);
    component.onSelectAll(null);
    component.onDeSelectAll(null);
    expect(true).toBeTrue();
  });

  it('should emit onCancel', () => {
    component.onCancel();
    fixture.whenStable().then(() => {
      expect(location.path()).toBe('/courses');
    });
  });

  it('should update course', () => {
    courseService.getCourse(8693).subscribe(
      (data) => {
        component.courseDetail = data;
        component.courseDetail.name = 'New';
        component.onSave();
        fixture.whenStable().then(() => {
          expect(location.path()).toBe('/courses');
        });
      },
      (err) => {
        console.log(err);
      }
    );
  });

  it('should create course', () => {
    courseService.getCourse(8693).subscribe(
      (data) => {
        data.id = 0;
        component.courseDetail = data;
        component.courseDetail.name = 'New';
        component.onSave();
        fixture.whenStable().then(() => {
          expect(location.path()).toBe('/courses');
        });
      },
      (err) => {
        console.log(err);
      }
    );
  });
});
