import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AdduserService } from './adduser.service';
import { Router } from '@angular/router';
import { User } from '../app-model';

@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.component.html',
  styleUrls: ['./adduser.component.css']
})
export class AdduserComponent implements OnInit {

  user = new User();
  allUsers: User[];
  backUpAllUsers: User[];
  ifAnyError: boolean;
  ifAnyWarning: boolean;
  ifPostedSuccessfully: boolean;
  errorAlertMessage: string;
  warningAlertMessage: string;
  userActionString: string;
  tobedeletedId: string;
  searchUserInput: string;
  addUserForm: FormGroup;

  constructor(private adduserService: AdduserService, private router: Router, private fb: FormBuilder) {
    this.user.fname = '';
    this.user.lname = '';
    this.user.empid = '';
    this.ifAnyError = false;
    this.ifAnyWarning = false;
    this.ifPostedSuccessfully = false;
    this.errorAlertMessage = '';
    this.warningAlertMessage = '';
    this.userActionString = '';
    this.tobedeletedId = '';
    this.searchUserInput = '';
    this.initializeForm();
  }

  ngOnInit() {
    this.adduserService.getallusers().subscribe((res: any) => {
        if (res) {
          this.allUsers = res;
          this.backUpAllUsers = this.allUsers;
        }
      }, (err) => {
        this.ifAnyError = true;
        this.errorAlertMessage = err.message;
    });
  }

  initializeForm(): void {
    this.addUserForm = this.fb.group({
      fname: ['', Validators.compose([Validators.required, Validators.minLength(2), Validators.pattern('^[a-zA-Z]+$')])],
      lname: ['', Validators.pattern('^[a-zA-Z]+$')],
      empid: ['', Validators.compose([Validators.required, Validators.minLength(5)])]
    });
  }

  validateForm(): boolean {
    this.ifAnyWarning = false;
    this.warningAlertMessage = '';
    if (this.addUserForm.controls.fname.invalid || this.addUserForm.controls.lname.invalid || this.addUserForm.controls.empid.invalid) {
      return false;
    } else {
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

  searchUser(): void {
    this.allUsers = this.backUpAllUsers;
    this.filterUser();
  }

  addUser(): void {
    if (this.validateForm()) {
        this.adduserService.addnewuser(this.user).subscribe((res: any) => {
          if (res) {
            this.userActionString = 'added';
            this.ifPostedSuccessfully = true;
            this.allUsers.push(res);
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

  updateUser(pEmpId: string): void {
    this.router.navigateByUrl('/upduser/' + pEmpId);
  }

  deleteUser(): void {
    this.adduserService.deleteuser(this.tobedeletedId).subscribe((res: any) => {
        if (res) {
          this.userActionString = 'deleted';
          this.ifPostedSuccessfully = true;
          this.allUsers = this.allUsers.filter(obj => obj.empid !== res.empid);
        }
      }, (err) => {
        this.ifAnyError = true;
        this.errorAlertMessage = err.message;
    });
  }

  resetValue(): void {
    this.user.fname = '';
    this.user.lname = '';
    this.user.empid = '';
    this.ifAnyWarning = false;
    this.warningAlertMessage = '';
    this.ifAnyError = false;
    this.errorAlertMessage = '';
  }

  sortByFName(): void {
    this.allUsers.sort((a: User, b: User) => {
      if (a.fname < b.fname) { return -1; } else if (a.fname > b.fname) { return 1; } else { return 0; }
    });
  }

  sortByLName(): void {
    this.allUsers.sort((a: User, b: User) => {
      if (a.lname < b.lname) { return -1; } else if (a.fname > b.fname) { return 1; } else { return 0; }
    });
  }

  sortByIdName(): void {
    this.allUsers.sort((a: User, b: User) => {
      if (a.empid < b.empid) { return -1; } else if (a.empid > b.empid) { return 1; } else { return 0; }
    });
  }
}
