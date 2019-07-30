import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AddtaskService } from './addtask.service';
import { Task, Project, User, Parent } from '../app-model';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-addtask',
  templateUrl: './addtask.component.html',
  styleUrls: ['./addtask.component.css']
})
export class AddtaskComponent implements OnInit {

  task = new Task();
  parent = new Parent();
  allUsers: User[];
  backUpAllUsers: User[];
  allProjects: Project[];
  backUpAllProjects: Project[];
  allTasks: Task[];
  backupAllTasks: Task[];
  ifAnyError: boolean;
  ifAnyWarning: boolean;
  ifPostedSuccessfully: boolean;
  errorAlertMessage: string;
  warningAlertMessage: string;
  successAlertMessage: string;
  tobesuspendedId: string;
  addTaskForm: FormGroup;
  needStartEndDate: boolean;
  displayUser: string;
  displayProject: string;
  displayParent: string;
  searchUserInput: string;
  searchProjectInput: string;
  searchParentInput: string;
  datepipe: DatePipe = new DatePipe('en-US');
  defaultStartDt: any;
  defaultEndDt: any;
  isParentTask: boolean;

  constructor(private addtaskService: AddtaskService, private fb: FormBuilder) {
    this.resetMsg();
    this.resetValue();
    this.initializeForm();
    this.defaultStartDt = this.datepipe.transform(new Date('2019/01/01'), 'yyyy-MM-dd');
    this.defaultEndDt = this.datepipe.transform(new Date('2050/12/31'), 'yyyy-MM-dd');
  }

  ngOnInit() {
    this.addtaskService.getalltasks().subscribe((res: any) => {
      if (res) {
        this.allTasks = res;
      }
    });
   }

  initTask(): void {
    this.task.taskname = '';
    this.task.priority = 0;
    this.task.status = true;
    this.task.parentid = '';
    this.task.projectid = '';
    this.task.userid = '';
    this.task.startdt = new Date();
    this.task.enddt = new Date();
    this.parent.taskname = '';
  }

  initializeForm(): void {
    this.addTaskForm = this.fb.group({
      taskname: ['', Validators.compose([Validators.required, Validators.minLength(5), Validators.pattern('^[a-zA-Z0-9]+$')])],
      startdt: ['', Validators.required],
      enddt: ['', Validators.required],
    });
  }

  validateForm(): boolean {
    this.ifAnyWarning = false;
    this.warningAlertMessage = '';
    const formControl = this.addTaskForm.controls;
    if (formControl.taskname.invalid) {
      return false;
    } else {
      if (this.displayProject === '') {
        return false;
      }
      if (this.isParentTask === false) {
        if (formControl.startdt.invalid || formControl.enddt.invalid) {
          return false;
        }
        if (this.displayParent === '') {
          return false;
        }
        if (this.displayUser === '') {
          return false;
        }
      }
      return true;
    }
  }

  filterUser(): void {
    this.allUsers = this.allUsers.filter(
      (i) => (
        i.fname.toUpperCase().includes(this.searchUserInput.toUpperCase()) ||
        i.lname.toUpperCase().includes(this.searchUserInput.toUpperCase())
      )
    );
  }

  filterProject(): void {
    this.allProjects = this.allProjects.filter(
      (i) => (
        i.project.toUpperCase().includes(this.searchProjectInput.toUpperCase())
      )
    );
  }

  filterParent(): void {
    this.allTasks = this.allTasks.filter(
      (i) => (
        i.taskname.toUpperCase().includes(this.searchParentInput.toUpperCase())
      )
    );
  }

  searchUser(): void {
    this.allUsers = this.backUpAllUsers;
    this.filterUser();
  }

  searchProject(): void {
    this.allProjects = this.backUpAllProjects;
    this.filterProject();
  }

  searchParent(): void {
    this.allTasks = this.backupAllTasks;
    this.filterParent();
  }

  loadUserName(): void {
      this.addtaskService.getallusers().subscribe((res: any) => {
        if (res) {
          this.allUsers = res;
          this.backUpAllUsers = this.allUsers;
        }
      }, (err) => {
        this.ifAnyError = true;
        this.errorAlertMessage = err.message;
    });
  }

  loadParentName(): void {
      this.addtaskService.getallparents().subscribe((res: any) => {
        if (res) {
          for (const iterator of res) {
            const obj = this.allTasks.find(o => o.taskname === iterator.taskname);
            if (!obj) {
              const t = {
                _id: iterator._id,
                taskname: iterator.taskname,
                priority: 0,
                priorityTo: 0,
                parentid: '',
                startdt: new Date(),
                enddt: new Date(),
                status: false,
                finished: false,
                running: false,
                userid: '',
                projectid: '',
                onModel: 'parententity',
                olduser: '',
              };
              this.allTasks.push(t);
            }
          }
          this.backupAllTasks = this.allTasks;
        }
      }, (err) => {
        this.ifAnyError = true;
        this.errorAlertMessage = err.message;
    });
  }

  loadProjectName(): void {
      this.addtaskService.getallproject().subscribe((res: any) => {
        if (res) {
          this.allProjects = res;
          this.backUpAllProjects = this.allProjects;
        }
      }, (err) => {
        this.ifAnyError = true;
        this.errorAlertMessage = err.message;
    });
  }

  selectProject(pProjId: string, pProjName: string): void {
    this.displayProject = pProjName;
    this.task.projectid = pProjId;
  }

  selectParent(pParentId: string, pParentName: string, pOnModel: string): void {
    this.displayParent = pParentName;
    this.task.parentid = pParentId;
    this.task.onModel = pOnModel;
  }

  selectUser(pUserId: string, pUserName: string): void {
    this.displayUser = pUserName;
    this.task.userid = pUserId;
  }

  clearNonParentField(): void {
    this.task.priority = 0;
    this.displayParent = '';
    this.task.parentid = '';
    this.displayUser = '';
    this.task.userid = '';
    this.task.startdt = this.defaultStartDt;
    this.task.enddt = this.defaultEndDt;
  }

  needParentCheckValue(pEvent: any): void {
    this.isParentTask = pEvent.target.checked;
    const startdtCtrl = this.addTaskForm.get('startdt');
    const enddtCtrl = this.addTaskForm.get('enddt');
    if (this.isParentTask === true) {
      this.clearNonParentField();
      startdtCtrl.disable();
      enddtCtrl.disable();
    } else {
      startdtCtrl.enable();
      enddtCtrl.enable();
      this.task.startdt = new Date();
      this.task.enddt = new Date();
    }
  }

  addTask(): void {
    this.resetMsg();
    if (this.validateForm()) {
      if (this.isParentTask === true) {
        this.addParent();
      } else {
          if (this.task.onModel === 'parententity') {
            this.task.onModel = 'Parent';
          } else {
            this.task.onModel = 'Task';
          }
          this.addtaskService.addnewtask(this.task).subscribe((res: any) => {
            if (res) {
              this.successAlertMessage = 'Added a Task successfully!';
              this.ifPostedSuccessfully = true;
              this.resetValue();
            }
          }, (err) => {
            this.ifAnyError = true;
            this.errorAlertMessage = err.message;
        });
      }
    } else {
      this.ifAnyWarning = true;
      this.warningAlertMessage = 'Invalid or Missing Input.';
    }
  }

  addParent(): void {
    this.parent.taskname = this.task.taskname;
    this.addtaskService.addnewparent(this.parent).subscribe((res: any) => {
      if (res) {
        this.successAlertMessage = 'Added a Parent Task successfully!';
        this.ifPostedSuccessfully = true;
        this.resetValue();
      }
    }, (err) => {
        this.ifAnyError = true;
        this.errorAlertMessage = err.message;
    });
  }

  resetMsg(): void {
    this.ifAnyError = false;
    this.ifAnyWarning = false;
    this.errorAlertMessage = '';
    this.warningAlertMessage = '';
    this.successAlertMessage = '';
    this.ifPostedSuccessfully = false;
  }

  resetValue(): void {
    this.initTask();
    this.isParentTask = false;
    this.searchUserInput = '';
    this.searchProjectInput = '';
    this.searchParentInput = '';
    this.displayUser = '';
    this.displayProject = '';
    this.displayParent = '';
  }
}
