import { TestBed } from '@angular/core/testing';

import { PushpulldataService } from './pushpulldata.service';

describe('PushpulldataService', () => {
  let service: PushpulldataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PushpulldataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
