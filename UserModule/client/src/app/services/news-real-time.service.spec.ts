import { TestBed } from '@angular/core/testing';

import { RealTimeNewsService } from './news-real-time.service';

describe('NewsRealTimeService', () => {
  let service: RealTimeNewsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RealTimeNewsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
