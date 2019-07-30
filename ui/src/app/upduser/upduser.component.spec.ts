import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpduserComponent } from './upduser.component';

describe('UpduserComponent', () => {
  let component: UpduserComponent;
  let fixture: ComponentFixture<UpduserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpduserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpduserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
