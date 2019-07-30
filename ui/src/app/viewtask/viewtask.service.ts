import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from '../app-model';

@Injectable({
  providedIn: 'root'
})
export class ViewtaskService {

  private uriBase: string;
  private apiGetTask: string;
  private apiUpdTask: string;
  private apiGetProj: string;

  constructor(private httpConnection: HttpClient) {
    this.uriBase = 'http://localhost:5252/';
    this.apiGetTask = 'get-task/';
    this.apiUpdTask = 'upd-task/';
    this.apiGetProj = 'get-project/';
  }

  getalltasks(): Observable<any> {
    const newUrl = this.uriBase + this.apiGetTask;
    return this.httpConnection.get(newUrl);
  }

  getallproject(): Observable<any> {
    const newUrl = this.uriBase + this.apiGetProj;
    return this.httpConnection.get(newUrl);
  }

  updatetask(pTaskId: string, pPayload: Task): Observable<any> {
    const newUrl = this.uriBase + this.apiUpdTask + pTaskId;
    return this.httpConnection.put(newUrl, pPayload);
  }
}
