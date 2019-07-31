import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AddprojectService } from './addproject.service';

describe('AddprojectService', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        FormsModule,
        HttpClientModule
      ],
      providers: [
        AddprojectService,
      ]
    }).compileComponents();
  }));

  it('should be created', () => {
    const service: AddprojectService = TestBed.get(AddprojectService);
    expect(service).toBeTruthy();
  });
});
