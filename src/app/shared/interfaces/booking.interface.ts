import { User } from "./interfaces.general";
import { Parking } from "./parking.interface";
import { Place } from "./places.interface";

// interfaces/booking.interface.ts
export interface Booking {
  _id?: string;
  client: string | User;
  parking: string | Parking;
  place: string | Place;
  dateDebut: Date;
  dateFin: Date;
  typeReservation: 'HORAIRE' | 'JOURNALIER' | 'MENSUEL';
  montantTotal: number;
  statut: 'CONFIRMEE' | 'ANNULEE' | 'EN_COURS' | 'TERMINEE';
  paiement?: {
    methode: 'CARTE' | 'ESPECES' | 'PORTEFEUILLE' | 'COUPON';
    statut: 'EN_ATTENTE' | 'PAYE' | 'ERREUR' | 'REMBOURSE';
    transactionId?: string;
  };
  vehicule?: Vehicule;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface BookingCreateDto {
  parkingId: string;
  placeId: string;
  dateDebut: Date | string;
  dateFin: Date | string;
  typeReservation: 'HORAIRE' | 'JOURNALIER' | 'MENSUEL';
  vehicule?: Vehicule;
}

export interface BookingResponse {
  success: boolean;
  message?: string;
  booking?: Booking;
  error?: any;
}
// interfaces/search.interface.ts
export interface SearchPlaceParams {
  longitude: number;
  latitude: number;
  rayon?: number; // en mètres
  typePlace?: 'standard' | 'handicape' | 'electrique' | 'premium';
  dateDebut?: Date;
  dateFin?: Date;
}

export interface AvailablePlaceResult {
  parking: Parking;
  place: Place;
  distance: number; // en mètres
  tarif: number;
  dureeMax?: number; // en heures
}
// interfaces/filter.interface.ts
export interface ParkingFilter {
  prestations?: string[];
  typesPlace?: ('standard' | 'handicape' | 'electrique' | 'premium')[];
  prixMax?: number;
  distanceMax?: number; // en km
  ouvertMaintenant?: boolean;
  avecParkingElectrique?: boolean;
  avecParkingHandicape?: boolean;
}
 export interface Vehicule {
  immatriculation: string;
  marque: string;
  modele: string;
  type: 'VOITURE' | 'MOTO' | 'UTILITAIRE';
  electrique?: boolean;
  handicap?: boolean;
}