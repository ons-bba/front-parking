import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from '../../../shared/interfaces/interfaces.general';
import {Observable} from 'rxjs';


export interface getAllUserForAdminInterface{
  count : number ,
  users: User [],
  success:Boolean
}

export interface StatisticsResponse {
  success: boolean;
  statistics: UserStatistics;
}

export interface UserStatistics {
  totalUsers: number;
  roleDistribution: { [key: string]: number };
  statusDistribution: { [key: string]: number };
  genderDistribution: { [key: string]: number };
  registrationTrends: RegistrationTrend[];
  loyaltyPoints: LoyaltyPoints;
  phoneUsage: PhoneUsage;
  imageUsage: { [key: string]: number };
  recentActivity: number;
  topLoyalUsers: TopLoyalUser[];
}

export interface RegistrationTrend {
  year: number;
  month: number;
  count: number;
}

export interface LoyaltyPoints {
  average: number;
  maximum: number;
  minimum: number;
  aboveAverageCount: number;
}

export interface PhoneUsage {
  withPhone: number;
  withoutPhone: number;
}

export interface TopLoyalUser {
  _id: string;
  nom: string;
  prenom: string;
  points_fidelite: number;
  image: string;
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


  getStatistics(): Observable<StatisticsResponse> {
    return this.httpclient.get<StatisticsResponse>(`${this.baseUrl}statistics`);
  }


}
