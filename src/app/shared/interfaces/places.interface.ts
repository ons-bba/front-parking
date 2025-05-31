import { Tarif } from "./tarif.interface";

export interface Place {
  _id?: string;

  parking: string | { _id: string; nom?: string; adresse?: string }; // ID du parking (ou un objet si peuplé)

  numero: string;

  tarif?: string | Tarif;
  statut?: 'libre' | 'réservée' | 'occupée' | 'maintenance';

  type?: 'standard' | 'handicape' | 'electrique' | 'premium';
}
