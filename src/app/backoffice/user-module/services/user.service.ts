import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from '../../../shared/interfaces/interfaces.general';
import {Observable, tap} from 'rxjs';
import {AuthService} from '../../../services/auth.service';


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
  private baseUrl = "http://localhost:3000/users";

  constructor(
    private httpclient: HttpClient,
    private authService: AuthService
  ) { }

  getAllUser(): Observable<getAllUserForAdminInterface> {
    return this.httpclient.get<getAllUserForAdminInterface>(`${this.baseUrl}/active`);
  }

  getUserById(userId: string): Observable<{ success: boolean; user: User }> {
    return this.httpclient.get<{ success: boolean; user: User }>(`${this.baseUrl}/${userId}`);
  }

  updateUser(updatedUser: any, userId: string): Observable<any> {
    return this.httpclient.put(`${this.baseUrl}/${userId}/update`, updatedUser).pipe(
      tap(() => {
        const currentUser = this.authService.getCurrentUserValue();
        if (currentUser && currentUser._id === userId) {
          this.authService.updateCurrentUser({ ...currentUser, ...updatedUser });
        }
      })
    );
  }

// user.service.ts
  uploadUserImage(userId: string, imageFile: File): Observable<any> {
    const formData = new FormData();
    formData.append('image', imageFile);
    return this.httpclient.put<any>(`${this.baseUrl}/${userId}/image`, formData).pipe(
      tap((response) => {
        const currentUser = this.authService.getCurrentUserValue();
        if (currentUser && currentUser._id === userId) {
          // Update with the full user object from response
          this.authService.updateCurrentUser(response.user);
        }
      })
    );
  }

  archiver(id: string): Observable<any> {
    return this.httpclient.put(`${this.baseUrl}/${id}/archive`, {});
  }

  getStatistics(): Observable<StatisticsResponse> {
    return this.httpclient.get<StatisticsResponse>(`${this.baseUrl}/statistics`);
  }

}
