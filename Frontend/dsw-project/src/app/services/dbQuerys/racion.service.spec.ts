import { TestBed } from '@angular/core/testing';

import { RacionService } from './racion.service';

describe('RacionService', () => {
  let service: RacionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RacionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
