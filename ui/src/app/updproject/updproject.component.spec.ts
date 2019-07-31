import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { UpdprojectComponent } from './updproject.component';

describe('UpdprojectComponent', () => {
  let component: UpdprojectComponent;
  let fixture: ComponentFixture<UpdprojectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule
      ],
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

  it('Should return False if all input fields are NOT populated', () => {
    component.project.project = 'ABC';
    const objData = component.validateForm();
    expect(objData).toBeFalsy();
  });

  it('Priority will be set back to default value', () => {
    component.resetValue();
    expect(component.project.priority).toEqual(0);
  });

  it('ifAnyError check will be False', () => {
    component.resetValue();
    expect(component.ifAnyError).toBeFalsy();
  });
});
