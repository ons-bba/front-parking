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

  getUserById(userId: string) {
    return this.httpclient.get<{success:boolean , user :User}>(this.baseUrl + userId);
  }

  updateUser(updatedUser: any, _id: string) {
    return this.httpclient.put(this.baseUrl  + _id + "/update", updatedUser);
  }

  archiver(id :string ) {
    return this.httpclient.put(`${this.baseUrl}${id}`, this.baseUrl);
  }
}
