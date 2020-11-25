import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from './auth.service';
import { UnitTestHelper } from './unit.test.helper';

// Straight Jasmine testing without Angular's testing support
describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes(UnitTestHelper.injectTestingRoute()),
        HttpClientModule,
      ],
      providers: [AuthService],
    }).compileComponents();
  });

  beforeEach(() => {
    service = TestBed.inject(AuthService);
  });

  it('should logout', () => {
    service.logout();
    expect(service.username).toBe('');
  });

  it('#getUsername should get username', () => {
    service.login({ login: 'Morales', password: 'id' }).subscribe(
      (data) => {
        service.processLoginSuccess(data);
        var userInfo = service.getUserInfo();
        var userToken = service.getToken();
        expect(userInfo).toBeDefined();
        expect(userToken).toBeDefined();
      },
      (err) => {
        console.log(err);
      }
    );
  });
});
