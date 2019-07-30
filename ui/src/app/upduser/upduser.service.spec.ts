import { TestBed } from '@angular/core/testing';

import { UpduserService } from './upduser.service';

describe('UpduserService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UpduserService = TestBed.get(UpduserService);
    expect(service).toBeTruthy();
  });
});
