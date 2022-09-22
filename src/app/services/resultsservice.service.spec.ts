import { TestBed } from '@angular/core/testing';

import { ResultsserviceService } from './resultsservice.service';

describe('ResultsserviceService', () => {
  let service: ResultsserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ResultsserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
