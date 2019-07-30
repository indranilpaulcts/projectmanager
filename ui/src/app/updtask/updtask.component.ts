import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UpdtaskService } from './updtask.service';
import { Task, Project, User, Parent } from '../app-model';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-updtask',
  templateUrl: './updtask.component.html',
  styleUrls: ['./updtask.component.css']
})
export class UpdtaskComponent implements OnInit {

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
  taskId: string;

  constructor(private activatedRoute: ActivatedRoute, private router: Router,
              private updtaskService: UpdtaskService, private fb: FormBuilder) {
    this.resetMsg();
    this.resetValue();
    this.initializeForm();
    this.defaultStartDt = this.datepipe.transform(new Date('2019/01/01'), 'yyyy-MM-dd');
    this.defaultEndDt = this.datepipe.transform(new Date('2050/12/31'), 'yyyy-MM-dd');
  }

  ngOnInit() {
    const params: any = this.activatedRoute.snapshot.params;
    this.taskId = params.id;

    this.updtaskService.getalltasks().subscribe((res: any) => {
      if (res) {
        this.allTasks = res;
      }
    });

    this.updtaskService.getsingleuser(this.taskId).subscribe((res: any) => {
      if (res) {
        this.displayUser = res[0].fname + ' ' + res[0].lname;
        this.task.userid = res[0]._id;
        this.task.olduser = res[0]._id;
      }
    });

    this.updtaskService.getsingletask(this.taskId).subscribe((res: any) => {
      if (res) {
        this.task.taskname = res[0].taskname;
        this.task.priority = res[0].priority;
        this.task.startdt = res[0].startdt.toString().split('T')[0];
        this.task.enddt = res[0].enddt.toString().split('T')[0];
        this.task.status = res[0].status;
        this.displayParent = res[0].parentid.taskname;
        this.displayProject = res[0].projectid.project;
        this.task.parentid = res[0].parentid._id;
        this.task.projectid = res[0].projectid._id;
        this.ifAnyError = false;
        this.errorAlertMessage = '';
        this.ifPostedSuccessfully = false;
      }
    }, (err) => {
      this.ifAnyError = true;
      this.errorAlertMessage = err.message;
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

  searchParent(): void {
    this.allTasks = this.backupAllTasks;
    this.filterParent();
  }

  loadUserName(): void {
      this.updtaskService.getallusers().subscribe((res: any) => {
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
      this.updtaskService.getallparents().subscribe((res: any) => {
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

  saveTask(): void {
    this.resetMsg();
    if (this.validateForm()) {
        if (this.task.onModel === 'parententity') {
          this.task.onModel = 'Parent';
        } else {
          this.task.onModel = 'Task';
        }
        this.updtaskService.updatetask(this.taskId, this.task).subscribe((res: any) => {
          if (res) {
            this.successAlertMessage = 'Updated a Task successfully!';
            this.ifPostedSuccessfully = true;
            this.resetValue();
          }
        }, (err) => {
          this.ifAnyError = true;
          this.errorAlertMessage = err.message;
      });
    } else {
      this.ifAnyWarning = true;
      this.warningAlertMessage = 'Invalid or Missing Input.';
    }
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
    this.taskId = '';
    this.isParentTask = false;
    this.searchUserInput = '';
    this.searchProjectInput = '';
    this.searchParentInput = '';
    this.displayUser = '';
    this.displayProject = '';
    this.displayParent = '';
  }

  back(): void {
    this.router.navigateByUrl('/addtask');
  }
}
