import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';
import {LoginResponse, User} from '../shared/interfaces/interfaces.general';
import {LoginInterface} from '../login/login.component';
export enum Role {
  CONDUCTEUR = 'CONDUCTEUR',
  OPERATEUR  = 'OPERATEUR',
  ADMIN      = 'ADMIN',
}


export enum Statut {
  ACTIF = 'ACTIF',
  SUSPENDU = 'SUSPENDU',
  BLOQUE = 'BLOQUE',
  ARCHIVE = 'ARCHIVE',
  PENDING = 'PENDING'
}


/**
 * Enum for user sex
 */
export enum Sex {
  HOMME = 'HOMME',
  FEMME = 'FEMME',
}

/**
 * Data Transfer Object for creating a new user.
 * This mirrors the fields expected by the backend.
 */
export interface CreateUserDto {
  nom: string;
  prenom: string;
  email: string;
  mot_de_passe: string;
  telephone?: string;
  role: Role;
  sex: Sex;
  imageFile?: File | null;
}
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = "http://localhost:3000/users";
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable().pipe(
    distinctUntilChanged((prev, curr) =>
      JSON.stringify(prev) === JSON.stringify(curr)
    )
  );

  constructor(private http: HttpClient) {
    this.initializeUser();
  }

  private initializeUser(): void {
    const userJson = localStorage.getItem('user');
    if (userJson) {
      try {
        const user: User = JSON.parse(userJson);
        this.currentUserSubject.next(user);
      } catch (e) {
        console.error('Error parsing user data', e);
        this.clearUserData();
      }
    }
  }

  createUser(user: FormData): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, user);
  }

  verifyAccount(token: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/verifyaccount/${token}`);
  }

  login(loginData: LoginInterface): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.baseUrl}/login`, loginData).pipe(
      map(response => {
        this.storeLoginData(response.token, response.user);
        return response;
      })
    );
  }

  storeLoginData(token: string, user: User): void {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.currentUserSubject.next(user);
  }

  updateCurrentUser(updatedUser: User): void {
    // Ensure we store the full user object with image
    localStorage.setItem('user', JSON.stringify(updatedUser));
    this.currentUserSubject.next(updatedUser);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getCurrentUserValue(): User | null {
    return this.currentUserSubject.value;
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  logout(): void {
    this.clearUserData();
    this.currentUserSubject.next(null);
  }

  private clearUserData(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  forgotPassword(email: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/forgot-password`, { email });
  }

  resetPassword(data: { token: string; newPassword: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/reset-password`, data);
  }
}
