import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { UpdtaskComponent } from './updtask.component';
import { UpdtaskService } from './updtask.service';

describe('UpdtaskComponent', () => {
  let component: UpdtaskComponent;
  let fixture: ComponentFixture<UpdtaskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        FormsModule,
        HttpClientModule
      ],
      declarations: [ UpdtaskComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdtaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should return False if all input fields are NOT populated', () => {
    component.task.taskname = '';
    const objData = component.validationOfForm();
    expect(objData).toBeFalsy();
  });
});
