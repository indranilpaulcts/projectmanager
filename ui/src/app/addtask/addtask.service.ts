import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task, Parent } from '../app-model';

@Injectable({
  providedIn: 'root'
})
export class AddtaskService {

  private uriBase: string;
  private apiGetParent: string;
  private apiGetUser: string;
  private apiGetProj: string;
  private apiAddTask: string;
  private apiAddParent: string;
  private apiGetTask: string;

  constructor(private httpConnection: HttpClient) {
    this.uriBase = 'http://localhost:5252/';
    this.apiGetParent = 'get-parent/';
    this.apiGetTask = 'get-task/';
    this.apiGetUser = 'get-user/';
    this.apiGetProj = 'get-project/';
    this.apiAddTask = 'add-task/';
    this.apiAddParent = 'add-parent/';
  }

  addnewtask(task: Task): Observable<any> {
    const newUrl = this.uriBase + this.apiAddTask;
    return this.httpConnection.post(newUrl, task);
  }

  addnewparent(parent: Parent): Observable<any> {
    const newUrl = this.uriBase + this.apiAddParent;
    return this.httpConnection.post(newUrl, parent);
  }

  getallusers(): Observable<any> {
    const newUrl = this.uriBase + this.apiGetUser;
    return this.httpConnection.get(newUrl);
  }

  getallproject(): Observable<any> {
    const newUrl = this.uriBase + this.apiGetProj;
    return this.httpConnection.get(newUrl);
  }

  getalltasks(): Observable<any> {
    const newUrl = this.uriBase + this.apiGetTask;
    return this.httpConnection.get(newUrl);
  }

  getallparents(): Observable<any> {
    const newUrl = this.uriBase + this.apiGetParent;
    return this.httpConnection.get(newUrl);
  }
}
