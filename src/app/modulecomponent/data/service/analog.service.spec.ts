import { TestBed } from '@angular/core/testing';

import { AnalogService } from './analog.service';

describe('AnalogService', () => {
  let service: AnalogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AnalogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
