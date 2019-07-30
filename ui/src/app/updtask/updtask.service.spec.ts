import { TestBed, async } from '@angular/core/testing';
import { UpdtaskService } from './updtask.service';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

describe('UpdtaskService', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        FormsModule,
        HttpClientModule
      ],
      providers: [
        UpdtaskService,
      ]
    }).compileComponents();
  }));

  it('should be created', () => {
    const service: UpdtaskService = TestBed.get(UpdtaskService);
    expect(service).toBeTruthy();
  });
});
