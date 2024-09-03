import { TestBed } from '@angular/core/testing';

import { AdminworksService } from './adminworks.service';

describe('AdminworksService', () => {
  let service: AdminworksService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminworksService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
