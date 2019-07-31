import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AddprojectService } from './addproject.service';
import { Router } from '@angular/router';
import { User, Project } from '../app-model';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-addproject',
  templateUrl: './addproject.component.html',
  styleUrls: ['./addproject.component.css']
})
export class AddprojectComponent implements OnInit {
  project = new Project();
  allUsers: User[];
  backUpAllUsers: User[];
  allProjects: Project[];
  backUpAllProjects: Project[];
  ifAnyError: boolean;
  ifAnyWarning: boolean;
  ifPostedSuccessfully: boolean;
  errorAlertMessage: string;
  warningAlertMessage: string;
  projectActionString: string;
  tobesuspendedId: string;
  addProjectForm: FormGroup;
  needStartEndDate: boolean;
  displayManager: string;
  searchManagerInput: string;
  searchProjectInput: string;
  datepipe: DatePipe = new DatePipe('en-US');
  defaultStartDt: any;
  defaultEndDt: any;

  constructor(private addprojectService: AddprojectService, private router: Router, private fb: FormBuilder) {
    this.project.project = '';
    this.project.manager = '';
    this.project.priority = 0;
    this.project.finished = false;
    this.ifAnyError = false;
    this.ifAnyWarning = false;
    this.ifPostedSuccessfully = false;
    this.errorAlertMessage = '';
    this.warningAlertMessage = '';
    this.projectActionString = '';
    this.tobesuspendedId = '';
    this.needStartEndDate = true;
    this.displayManager = '';
    this.searchManagerInput = '';
    this.searchProjectInput = '';
    const someDate = new Date();
    someDate.setTime(someDate.getTime() + (1 * 24 * 60 * 60 * 1000));
    this.defaultStartDt = this.datepipe.transform(new Date(), 'yyyy-MM-dd');
    this.defaultEndDt = this.datepipe.transform(someDate, 'yyyy-MM-dd');
    this.initializeForm();
  }

  ngOnInit() {
    this.addprojectService.updatecount().subscribe((r: any) => {
      if (r) {
        this.addprojectService.getallproject().subscribe((res: any) => {
            if (res) {
              this.allProjects = res;
              this.backUpAllProjects = this.allProjects;
            }
          }, (err) => {
            this.ifAnyError = true;
            this.errorAlertMessage = err.message;
        });
      }
    }, (err) => {
      this.ifAnyError = true;
      this.errorAlertMessage = err.message;
    });
  }

  initializeForm(): void {
    this.addProjectForm = this.fb.group({
      project: ['', Validators.compose([Validators.required, Validators.minLength(5), Validators.pattern('^[a-zA-Z0-9]+$')])],
      manager: ['', Validators.required],
      startdt: ['', Validators.required],
      enddt: ['', Validators.required],
    });
  }

  validateForm(): boolean {
    this.ifAnyWarning = false;
    this.warningAlertMessage = '';
    if (this.addProjectForm.controls.project.invalid || this.addProjectForm.controls.manager.invalid) {
      return false;
    } else {
      if (this.needStartEndDate === true) {
        if (this.addProjectForm.controls.startdt.invalid || this.addProjectForm.controls.enddt.invalid) {
          return false;
        }
      } else {
        this.project.startdt = this.defaultStartDt;
        this.project.enddt = this.defaultEndDt;
      }
      return true;
    }
  }

  filterManager(): void {
    this.allUsers = this.allUsers.filter(
      (i) => (
        i.fname.toUpperCase().includes(this.searchManagerInput.toUpperCase()) ||
        i.lname.toUpperCase().includes(this.searchManagerInput.toUpperCase())
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

  searchManager(): void {
    this.allUsers = this.backUpAllUsers;
    this.filterManager();
  }

  searchProject(): void {
    this.allProjects = this.backUpAllProjects;
    this.filterProject();
  }

  needStartEndDateCheckValue(pEvent: any): void {
    this.needStartEndDate = pEvent.target.checked;
    const startdtCtrl = this.addProjectForm.get('startdt');
    const enddtCtrl = this.addProjectForm.get('enddt');

    if (this.needStartEndDate === false) {
      startdtCtrl.disable();
      enddtCtrl.disable();
    } else {
      startdtCtrl.enable();
      enddtCtrl.enable();
    }
  }

  addProject(): void {
    if (this.validateForm()) {
        this.addprojectService.addnewproject(this.project).subscribe((res: any) => {
          if (res) {
            this.projectActionString = 'added';
            this.ifPostedSuccessfully = true;
            this.allProjects.push(res);
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

  selectManager(pEmpId: string, pEmpName: string): void {
    this.displayManager = pEmpName;
    this.project.manager = pEmpId;
  }

  updateProject(pProjId: string): void {
    this.router.navigateByUrl('/updproject/' + pProjId);
  }

  loadManagerName(): void {
    this.searchManagerInput = '';
    this.addprojectService.getallusers().subscribe((res: any) => {
        if (res) {
          this.allUsers = res;
          this.backUpAllUsers = this.allUsers;
        }
      }, (err) => {
        this.ifAnyError = true;
        this.errorAlertMessage = err.message;
    });
  }

  suspendProject(): void {
    this.addprojectService.suspendproject(this.project, this.tobesuspendedId).subscribe((res: any) => {
        if (res) {
          this.projectActionString = 'suspended';
          this.ifPostedSuccessfully = true;
          this.allProjects = this.allProjects.filter(obj => obj.project !== res.project);
        }
      }, (err) => {
        this.ifAnyError = true;
        this.errorAlertMessage = err.message;
    });
  }

  resetValue(): void {
    this.project.project = '';
    this.project.manager = '';
    this.project.priority = 0;
    this.project.finished = false;
    this.project.startdt = new Date();
    this.project.enddt = new Date();
    this.ifAnyWarning = false;
    this.warningAlertMessage = '';
    this.ifAnyError = false;
    this.errorAlertMessage = '';
    this.displayManager = '';
    this.searchManagerInput = '';
    this.searchProjectInput = '';
    this.needStartEndDate = true;
  }

  sortByStartDt(): void {
    this.allProjects.sort((a: Project, b: Project) => {
      if (a.startdt < b.startdt) { return -1; } else if (a.startdt > b.startdt) { return 1; } else { return 0; }
    });
  }

  sortByEndDt(): void {
    this.allProjects.sort((a: Project, b: Project) => {
      if (a.enddt < b.enddt) { return -1; } else if (a.enddt > b.enddt) { return 1; } else { return 0; }
    });
  }

  sortByPriority(): void {
    this.allProjects.sort((a: Project, b: Project) => {
      if (a.priority < b.priority) { return -1; } else if (a.priority > b.priority) { return 1; } else { return 0; }
    });
  }

  sortByCompleted(): void {
    this.allProjects.sort((a: Project, b: Project) => {
      if (a.finished < b.finished) { return -1; } else if (a.finished > b.finished) { return 1; } else { return 0; }
    });
  }
}

