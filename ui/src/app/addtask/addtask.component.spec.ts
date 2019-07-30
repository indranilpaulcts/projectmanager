import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AddtaskComponent } from './addtask.component';
import { AddtaskService } from './addtask.service';

describe('AddtaskComponent', () => {
  let component: AddtaskComponent;
  let addtaskService: AddtaskService;

  beforeEach(() => {
    component = new AddtaskComponent(addtaskService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should return False if all input fields are NOT populated', () => {
    component.task.taskname = '';
    const objData = component.validationOfForm();
    expect(objData).toBeFalsy();
  });

  it('Priority will be set back to default value', () => {
    component.resetValue();
    expect(component.task.priority).toEqual(5);
  });

  it('ifAnyError check will be False', () => {
    component.resetMsg();
    expect(component.ifAnyError).toBeFalsy();
  });
});
