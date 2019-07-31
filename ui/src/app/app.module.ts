import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppRoutingModule,  } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddtaskComponent } from './addtask/addtask.component';
import { ViewtaskComponent } from './viewtask/viewtask.component';
import { UpdtaskComponent } from './updtask/updtask.component';
import { UpduserComponent } from './upduser/upduser.component';
import { AdduserComponent } from './adduser/adduser.component';
import { AddprojectComponent } from './addproject/addproject.component';
import { UpdprojectComponent } from './updproject/updproject.component';

import { AddtaskService } from './addtask/addtask.service';
import { ViewtaskService } from './viewtask/viewtask.service';
import { UpdtaskService } from './updtask/updtask.service';
import { AdduserService } from './adduser/adduser.service';
import { UpduserService } from './upduser/upduser.service';
import { AddprojectService } from './addproject/addproject.service';
import { UpdprojectService } from './updproject/updproject.service';

@NgModule({
  declarations: [
    AppComponent,
    AddtaskComponent,
    ViewtaskComponent,
    UpdtaskComponent,
    AdduserComponent,
    AddprojectComponent,
    UpduserComponent,
    UpdprojectComponent
  ],
  imports: [
    RouterModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    AddtaskService,
    ViewtaskService,
    UpdtaskService,
    AdduserService,
    UpduserService,
    AddprojectService,
    UpdprojectService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
