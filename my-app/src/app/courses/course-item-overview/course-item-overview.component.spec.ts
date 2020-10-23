import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseItemOverviewComponent } from './course-item-overview.component';

describe('CourseItemOverviewComponent', () => {
  let component: CourseItemOverviewComponent;
  let fixture: ComponentFixture<CourseItemOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CourseItemOverviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseItemOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
