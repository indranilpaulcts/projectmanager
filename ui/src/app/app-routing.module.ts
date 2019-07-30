import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddtaskComponent } from './addtask/addtask.component';
import { ViewtaskComponent } from './viewtask/viewtask.component';
import { AdduserComponent } from './adduser/adduser.component';
import { AddprojectComponent } from './addproject/addproject.component';
import { UpduserComponent } from './upduser/upduser.component';
import { UpdprojectComponent } from './updproject/updproject.component';
import { UpdtaskComponent } from './updtask/updtask.component';


const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'addproject'
  },
  {
    path: 'addproject',
    component: AddprojectComponent
  },
  {
    path: 'adduser',
    component: AdduserComponent
  },
  {
    path: 'addtask',
    component: AddtaskComponent
  },
  {
    path: 'updproject/:id',
    component: UpdprojectComponent
  },
  {
    path: 'upduser/:id',
    component: UpduserComponent
  },
  {
    path: 'updtask/:id',
    component: UpdtaskComponent
  },
  {
    path: 'viewtask',
    component: ViewtaskComponent
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
