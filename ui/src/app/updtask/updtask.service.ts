import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task, Parent } from '../app-model';

@Injectable({
  providedIn: 'root'
})
export class UpdtaskService {

  private uriBase: string;
  private apiGetTask: string;
  private apiUpdTask: string;
  private apiGetUser: string;
  private apiGetUserByPrj: string;
  private apiGetParent: string;
  private apiUpdParent: string;

  constructor(private httpConnection: HttpClient) {
    this.uriBase = 'http://localhost:5252/';
    this.apiGetTask = 'get-task/';
    this.apiUpdTask = 'upd-task/';
    this.apiGetUser = 'get-user/';
    this.apiGetUserByPrj = 'get-userbyproj/';
    this.apiGetParent = 'get-parent/';
    this.apiUpdParent = 'upd-parent/';
  }

  getalltasks(): Observable<any> {
    const newUrl = this.uriBase + this.apiGetTask;
    return this.httpConnection.get(newUrl);
  }

  getallusers(): Observable<any> {
    const newUrl = this.uriBase + this.apiGetUser;
    return this.httpConnection.get(newUrl);
  }

  getsingleuser(pUserId: string): Observable<any> {
    const newUrl = this.uriBase + this.apiGetUserByPrj + pUserId;
    return this.httpConnection.get(newUrl);
  }

  getsingletask(pTaskId: string): Observable<any> {
    const newUrl = this.uriBase + this.apiGetTask + pTaskId;
    return this.httpConnection.get(newUrl);
  }

  updatetask(pTaskId: string, pPayload: Task): Observable<any> {
    const newUrl = this.uriBase + this.apiUpdTask + pTaskId;
    return this.httpConnection.put(newUrl, pPayload);
  }

  updateparent(pParentId: string, pPayload: Parent): Observable<any> {
    const newUrl = this.uriBase + this.apiUpdParent + pParentId;
    return this.httpConnection.put(newUrl, pPayload);
  }

  getallparents(): Observable<any> {
    const newUrl = this.uriBase + this.apiGetParent;
    return this.httpConnection.get(newUrl);
  }
}
