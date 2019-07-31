import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ViewtaskService } from './viewtask.service';
import { Router } from '@angular/router';
import { Task, User, Project } from '../app-model';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-viewtask',
  templateUrl: './viewtask.component.html',
  styleUrls: ['./viewtask.component.css']
})
export class ViewtaskComponent implements OnInit {

  allTasks: Task[];
  originalTaskList: Task[];
  task = new Task();
  allUsers: User[];
  backUpAllUsers: User[];
  allProjects: Project[];
  backUpAllProjects: Project[];
  backupAllTasks: Task[];
  taskName: string;
  parentTask: string;
  priorityFrom: number;
  priorityTo: number;
  startDt: any;
  endDt: any;
  ifAnyError: boolean;
  ifAnyWarning: boolean;
  ifPostedSuccessfully: boolean;
  errorAlertMessage: string;
  successAlertMessage: string;
  warningAlertMessage: string;
  projectActionString: string;
  datepipe: DatePipe = new DatePipe('en-US');
  defaultStartDt: any;
  defaultEndDt: any;
  tobesuspendedId: string;
  addTaskForm: FormGroup;
  needStartEndDate: boolean;
  displayUser: string;
  displayProject: string;
  displayParent: string;
  searchUserInput: string;
  searchProjectInput: string;
  searchParentInput: string;
  isParentTask: boolean;
  tobeendedId: string;

  constructor(private viewtaskService: ViewtaskService, private router: Router) {
    this.task = new Task();
    this.ifAnyError = false;
    this.ifPostedSuccessfully = false;
    this.errorAlertMessage = '';
    this.successAlertMessage = '';
    this.tobeendedId = '';
    this.defaultStartDt = this.datepipe.transform(new Date('2019/01/01'), 'yyyy-MM-dd');
    this.defaultEndDt = this.datepipe.transform(new Date('2050/12/31'), 'yyyy-MM-dd');
  }

  ngOnInit() {
    this.viewtaskService.getalltasks().subscribe((res: any) => {
      if (res) {
        this.allTasks = res;
        this.originalTaskList = this.allTasks;
        console.log(this.allTasks);
      }
    }, (err) => {
      this.ifAnyError = true;
      this.errorAlertMessage = err.message;
    });
  }

  sortByStartDt(): void {
    this.allTasks.sort((a: Task, b: Task) => {
      if (a.startdt < b.startdt) { return -1; } else if (a.startdt > b.startdt) { return 1; } else { return 0; }
    });
  }

  sortByEndDt(): void {
    this.allTasks.sort((a: Task, b: Task) => {
      if (a.enddt < b.enddt) { return -1; } else if (a.enddt > b.enddt) { return 1; } else { return 0; }
    });
  }

  sortByPriority(): void {
    this.allTasks.sort((a: Task, b: Task) => {
      if (a.priority < b.priority) { return -1; } else if (a.priority > b.priority) { return 1; } else { return 0; }
    });
  }

  sortByCompleted(): void {
    this.allTasks.sort((a: Task, b: Task) => {
      if (a.finished < b.finished) { return -1; } else if (a.finished > b.finished) { return 1; } else { return 0; }
    });
  }

  resetMsg(): void {
    this.ifAnyError = false;
    this.ifPostedSuccessfully = false;
    this.errorAlertMessage = '';
    this.successAlertMessage = '';
  }

  filterProject(): void {
    this.allProjects = this.allProjects.filter(
      (i) => (
        i.project.toUpperCase().includes(this.searchProjectInput.toUpperCase())
      )
    );
  }

  searchProject(): void {
    this.allProjects = this.backUpAllProjects;
    this.filterProject();
  }

  loadProjectName(): void {
      this.viewtaskService.getallproject().subscribe((res: any) => {
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
    this.filterTaskBasedOnProject();
  }

  filterTaskBasedOnProject(): void {
    this.allTasks = this.originalTaskList;
    this.allTasks = this.allTasks.filter(
      (i: any) => (
        i.projectid.project.trim() === this.displayProject.trim()
      )
    );
  }

  editTask(taskId: string): void {
    this.router.navigateByUrl('/updtask/' + taskId);
  }

  endTask(): void {
    this.task.status = false;
    this.task.finished = true;
    this.task.running = false;
    this.viewtaskService.updatetask(this.tobeendedId, this.task).subscribe((res: any) => {
      if (res) {
        this.allTasks = res;
        this.originalTaskList = this.allTasks;
        this.ifPostedSuccessfully = true;
        this.successAlertMessage = 'You have successfully ended one task';
      }
    }, (err) => {
        this.ifAnyError = true;
        this.errorAlertMessage = err.message;
    });
  }

  resetValue(): void {
    this.allTasks = this.originalTaskList;
    this.displayProject =  '';
    this.task.projectid = '';
  }
}
