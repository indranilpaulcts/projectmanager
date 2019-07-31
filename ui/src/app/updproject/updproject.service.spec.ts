import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { UpdprojectService } from './updproject.service';

describe('UpdprojectService', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        FormsModule,
        HttpClientModule
      ],
      providers: [
        UpdprojectService,
      ]
    }).compileComponents();
  }));

  it('should be created', () => {
    const service: UpdprojectService = TestBed.get(UpdprojectService);
    expect(service).toBeTruthy();
  });
});
