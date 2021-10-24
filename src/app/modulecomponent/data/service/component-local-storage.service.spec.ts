import { TestBed } from '@angular/core/testing';

import { ComponentLocalStorageService } from './component-local-storage.service';

describe('ComponentLocalStorageService', () => {
  let service: ComponentLocalStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ComponentLocalStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
