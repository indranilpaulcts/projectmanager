import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AdduserService } from './adduser.service';

describe('AdduserService', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        FormsModule,
        HttpClientModule
      ],
      providers: [
        AdduserService,
      ]
    }).compileComponents();
  }));

  it('should be created', () => {
    const service: AdduserService = TestBed.get(AdduserService);
    expect(service).toBeTruthy();
  });
});
