import { TestBed } from '@angular/core/testing';

import { AddprojectService } from './addproject.service';

describe('AddprojectService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AddprojectService = TestBed.get(AddprojectService);
    expect(service).toBeTruthy();
  });
});
