import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {LoginInterface} from '../login/login.component';
import {LoginResponse, User} from '../shared/interfaces/interfaces.general';

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
  baseUrl ="http://localhost:3000/users/";
  constructor(private http: HttpClient) { }



  createUser(user:FormData){
    return this.http.post(this.baseUrl+"register" , user);
  }

  verifyAccount(token: string):any {
    return this.http.get<any>(`${this.baseUrl}/verifyaccount/${token}`);
  }

  login(loginData: LoginInterface) {
    return this.http.post<LoginResponse>(`${this.baseUrl}login`, loginData);
  }


  storeLoginData(token: string, user: User): void {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
  }

// Retrieve the stored token
  getToken(): string | null {
    return localStorage.getItem('token');
  }

// Retrieve the stored user
  getUser(): User | null {
    const userJson = localStorage.getItem('user');
    return userJson ? JSON.parse(userJson) : null;
  }

// Check if the user is authenticated
  isAuthenticated(): boolean {
    return !!this.getToken();
  }

// Clear session data
  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }


  forgotPassword(email: string) {
    return this.http.post(`${this.baseUrl}forgot-password`, email);
  }

  resetPassword(data: { token: string; newPassword: string }) {
    return this.http.post(`${this.baseUrl}reset-password`, data);
  }
}
