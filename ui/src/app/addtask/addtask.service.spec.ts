import { TestBed, async } from '@angular/core/testing';
import { AddtaskService } from './addtask.service';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

describe('AddtaskService', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        FormsModule,
        HttpClientModule
      ],
      providers: [
        AddtaskService,
      ]
    }).compileComponents();
  }));

  it('should be created', () => {
    const service: AddtaskService = TestBed.get(AddtaskService);
    expect(service).toBeTruthy();
  });
});
