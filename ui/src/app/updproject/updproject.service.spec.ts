import { TestBed } from '@angular/core/testing';

import { UpdprojectService } from './updproject.service';

describe('UpdprojectService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UpdprojectService = TestBed.get(UpdprojectService);
    expect(service).toBeTruthy();
  });
});
