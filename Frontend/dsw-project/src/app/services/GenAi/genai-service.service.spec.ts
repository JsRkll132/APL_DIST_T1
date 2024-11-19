import { TestBed } from '@angular/core/testing';

import { GenaiServiceService } from './genai-service.service';

describe('GenaiServiceService', () => {
  let service: GenaiServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GenaiServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
