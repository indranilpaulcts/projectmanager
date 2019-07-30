import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdprojectComponent } from './updproject.component';

describe('UpdprojectComponent', () => {
  let component: UpdprojectComponent;
  let fixture: ComponentFixture<UpdprojectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdprojectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdprojectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
