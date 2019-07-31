import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { UpduserService } from './upduser.service';

describe('UpduserService', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        FormsModule,
        HttpClientModule
      ],
      providers: [
        UpduserService,
      ]
    }).compileComponents();
  }));

  it('should be created', () => {
    const service: UpduserService = TestBed.get(UpduserService);
    expect(service).toBeTruthy();
  });
});
