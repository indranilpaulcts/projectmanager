import { TestBed, async } from '@angular/core/testing';
import { ViewtaskService } from './viewtask.service';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

describe('ViewtaskService', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        FormsModule,
        HttpClientModule
      ],
      providers: [
        ViewtaskService,
      ]
    }).compileComponents();
  }));

  it('should be created', () => {
    const service: ViewtaskService = TestBed.get(ViewtaskService);
    expect(service).toBeTruthy();
  });
});
