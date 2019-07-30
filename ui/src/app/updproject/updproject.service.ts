import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Project } from '../app-model';

@Injectable({
  providedIn: 'root'
})
export class UpdprojectService {

  private uriBase: string;
  private apiGetUser: string;
  private apiGetProj: string;
  private apiUpdProj: string;

  constructor(private httpConnection: HttpClient) {
    this.uriBase = 'http://localhost:5252/';
    this.apiGetUser = 'get-user/';
    this.apiGetProj = 'get-project/';
    this.apiUpdProj = 'upd-project/';
  }

  getsingleproject(pPid: string): Observable<any> {
    const newUrl = this.uriBase + this.apiGetProj + pPid;
    return this.httpConnection.get(newUrl);
  }

  getallusers(): Observable<any> {
    const newUrl = this.uriBase + this.apiGetUser;
    return this.httpConnection.get(newUrl);
  }

  updproject(pPid: string, pProj: Project): Observable<any> {
    const newUrl = this.uriBase + this.apiUpdProj + pPid;
    return this.httpConnection.put(newUrl, pProj);
  }
}
