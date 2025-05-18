import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

export enum Role {
  CONDUCTEUR = 'CONDUCTEUR',
  OPERATEUR  = 'OPERATEUR',
  ADMIN      = 'ADMIN',
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
  /**
   * Optional image file for upload.
   * When sending to the server you’ll wrap this in FormData.
   */
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
}
