import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { AuthService } from 'src/app/services/auth.service';
import { UnitTestHelper } from 'src/app/services/unit.test.helper';
import { HttpClientModule } from '@angular/common/http';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let authService: AuthService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes(UnitTestHelper.injectTestingRoute()),
        HttpClientModule,
      ],
      providers: [AuthService],
      declarations: [HeaderComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show username', () => {
    // authService.login('Test');
    component.ngOnInit();
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      let username = fixture.debugElement.query(By.css('.username'));
      expect(username.nativeElement.textContent).toEqual(component.username);
    });
  });

  it('should logout work', () => {
    component.ngOnInit();
    fixture.detectChanges();
    component.onLogout();
    fixture.whenStable().then(() => {
      let username = fixture.debugElement.query(By.css('.username'));
      expect(username).toBeNull();
    });
  });
});
