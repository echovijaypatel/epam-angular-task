import { TestBed } from '@angular/core/testing';
import { LoadingService } from './loading.service';

// Straight Jasmine testing without Angular's testing support
describe('LoadingService', () => {
  let service: LoadingService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [LoadingService],
    }).compileComponents();
  });

  beforeEach(() => {
    service = TestBed.inject(LoadingService);
  });

  it('should show hide', () => {
    service.showLoading(false);
    expect(service.loadingVisible).toBe(false);
    service.showLoading(true);
    expect(service.loadingVisible).toBe(true);
  });
});
