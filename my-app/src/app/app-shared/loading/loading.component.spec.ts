import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { LoadingComponent } from './loading.component';

describe('LoadingComponent', () => {
  let component: LoadingComponent;
  let fixture: ComponentFixture<LoadingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoadingComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    component.ngOnInit();
    component.ngOnDestroy();
    expect(component).toBeTruthy();
  });

  it('should show hide', () => {
    component.isLoadingVisible = false;
    expect(fixture.debugElement.query(By.css('.spinnerWrapper'))).toBeNull();
    component.isLoadingVisible = true;
    expect(fixture.debugElement.query(By.css('.spinnerWrapper'))).toBeDefined();
  });
});
