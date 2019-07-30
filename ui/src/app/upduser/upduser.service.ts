import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../app-model';

@Injectable({
  providedIn: 'root'
})
export class UpduserService {

  private uriBase: string;
  private apiUpdUser: string;
  private apiGetUser: string;

  constructor(private httpConnection: HttpClient) {
    this.uriBase = 'http://localhost:5252/';
    this.apiUpdUser = 'upd-user/';
    this.apiGetUser = 'get-user/';
  }

  getsingleuser(pEmpId: string): Observable<any> {
    const newUrl = this.uriBase + this.apiGetUser + pEmpId;
    return this.httpConnection.get(newUrl);
  }

  saveexistinguser(user: User, pEmpId: string): Observable<any> {
    const newUrl = this.uriBase + this.apiUpdUser + pEmpId;
    return this.httpConnection.put(newUrl, user);
  }
}
