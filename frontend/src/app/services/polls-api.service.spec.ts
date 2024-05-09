import { TestBed } from '@angular/core/testing';

import { PollsApiService } from './polls-api.service';

describe('PollsApiService', () => {
  let service: PollsApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PollsApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
