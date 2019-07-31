import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UpdprojectService } from './updproject.service';
import { Router } from '@angular/router';
import { User, Project } from '../app-model';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-updproject',
  templateUrl: './updproject.component.html',
  styleUrls: ['./updproject.component.css']
})
export class UpdprojectComponent implements OnInit {
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
  updProjectForm: FormGroup;
  needStartEndDate: boolean;
  displayManager: string;
  searchManagerInput: string;
  datepipe: DatePipe = new DatePipe('en-US');
  defaultStartDt: any;
  defaultEndDt: any;
  projId: string;
  updatecomplete: boolean;

  constructor(private updprojectService: UpdprojectService, private activatedRoute: ActivatedRoute,
              private router: Router, private fb: FormBuilder) {
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
    this.needStartEndDate = true;
    this.displayManager = '';
    this.searchManagerInput = '';
    const someDate = new Date();
    someDate.setTime(someDate.getTime() + (1 * 24 * 60 * 60 * 1000));
    this.defaultStartDt = this.datepipe.transform(new Date(), 'yyyy-MM-dd');
    this.defaultEndDt = this.datepipe.transform(someDate, 'yyyy-MM-dd');
    this.projId = '';
    this.updatecomplete = false;
    this.initializeForm();
  }

  validateForm(): boolean {
    this.ifAnyWarning = false;
    this.warningAlertMessage = '';
    if (this.updProjectForm.controls.project.invalid || this.updProjectForm.controls.manager.invalid) {
      return false;
    } else {
      if (this.needStartEndDate === true) {
        if (!this.project.startdt) {
          return false;
        }
        if (!this.project.enddt) {
          return false;
        }
      } else {
        this.project.startdt = this.defaultStartDt;
        this.project.enddt = this.defaultEndDt;
      }
      return true;
    }
  }

  ngOnInit() {
    const params: any = this.activatedRoute.snapshot.params;
    this.projId = params.id;

    this.updprojectService.getallusers().subscribe((response: any) => {
      if (response) {
        this.allUsers = response;
        this.backUpAllUsers = this.allUsers;

        this.updprojectService.getsingleproject(this.projId).subscribe((res: any) => {
          if (res) {
            this.project.project = res.project;
            this.project.priority = res.priority;
            this.project.oldmanager = '';
            this.ifAnyError = false;
            this.errorAlertMessage = '';
            this.ifPostedSuccessfully = false;

            // Search Project Id in User array
            for (const u of response) {
              let found = false;
              for (const p of u.projectid) {
                if (p._id === res._id) {
                  this.project.oldmanager = u._id;
                  this.displayManager = u.fname + ' ' + u.lname;
                  found = true;
                  break;
                }
              }
              if (found === true) { break; }
            }

          }
        }, (err: any) => {
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
    this.updProjectForm = this.fb.group({
      project: ['', Validators.compose([Validators.required, Validators.minLength(5), Validators.pattern('^[a-zA-Z0-9]+$')])],
      manager: ['', Validators.required],
    });
  }

  filterManager(): void {
    this.allUsers = this.allUsers.filter(
      (i) => (
        i.fname.toUpperCase().includes(this.searchManagerInput.toUpperCase()) ||
        i.lname.toUpperCase().includes(this.searchManagerInput.toUpperCase())
      )
    );
  }

  searchManager(): void {
    this.allUsers = this.backUpAllUsers;
    this.filterManager();
  }

  selectManager(pEmpId: string, pEmpName: string): void {
    this.displayManager = pEmpName;
    this.project.manager = pEmpId;
  }

  loadManagerName(): void {
    this.searchManagerInput = '';
    this.updprojectService.getallusers().subscribe((res: any) => {
        if (res) {
          this.allUsers = res;
          this.backUpAllUsers = this.allUsers;
        }
      }, (err) => {
        this.ifAnyError = true;
        this.errorAlertMessage = err.message;
    });
  }

  needStartEndDateCheckValue(pEvent: any): void {
    this.needStartEndDate = pEvent.target.checked;
  }

  saveProject(): void {
    if (this.validateForm() === true) {
        this.updprojectService.updproject(this.projId, this.project).subscribe((res: any) => {
          if (res) {
            this.projectActionString = 'updated';
            this.ifPostedSuccessfully = true;
            this.updatecomplete = true;
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

  back(): void {
    this.router.navigateByUrl('/addproject');
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
  }

}
