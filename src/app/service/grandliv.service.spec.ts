import { TestBed } from '@angular/core/testing';

import { GrandlivService } from './grandliv.service';

describe('GrandlivService', () => {
  let service: GrandlivService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GrandlivService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
