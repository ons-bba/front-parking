import {Role, Sex} from '../../services/auth.service';

export interface User {
  _id: string;
  nom: string;
  prenom: string;
  email: string;
  telephone: string;
  role: Role;
  points_fidelite: number;
  status: string;
  sex: Sex;
  image: string;
  historique_stationnement: any[];
  date_inscription: string;
}

export interface LoginResponse {
  success: boolean;
  message: string;
  token: string;
  user: User;
}
