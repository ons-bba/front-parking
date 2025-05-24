import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from '../../../shared/interfaces/interfaces.general';
import {Observable} from 'rxjs';


export interface getAllUserForAdminInterface{
  count : number ,
  users: User [],
  success:Boolean
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = "http://localhost:3000/users/";
  constructor(private httpclient : HttpClient) { }

  getAllUser() :Observable<getAllUserForAdminInterface> {
    return this.httpclient.get<getAllUserForAdminInterface>(this.baseUrl+"/active")
  }
}
