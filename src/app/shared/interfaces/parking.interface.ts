// interfaces/parking.interface.ts

export interface Localisation {
  type: string;
  coordinates: [number, number]; // [longitude, latitude]
}

export interface Horaire {
  ouverture: string;
  fermeture: string;
}

export interface TarifType {
  horaire: number;
  journalier: number;
  mensuelle: number | null;
}

export interface PlacesDisponibles {
  standard: number;
  handicape: number;
  premium: number;
  electrique: number;
}

export interface Prestation {
  _id: string;
  nom: string;
  description: string;
  categorie: string;
  tarif: string;
  montant: number;
  devise: string;
  disponible: boolean;
  exigences: string[];
  icone: string;
  dateCreation: string;
  
  horaires?: {
    ouverture: string;
    fermeture: string;
  };
}

export interface Parking {
  _id: string;
  nom: string;
  statut: 'OUVERT' | 'FERME' | 'COMPLET' | 'MAINTENANCE';
  placesDisponible: number;
  placesTotal: number;
  localisation: Localisation;
  prestations: Prestation[];
  horaires: Horaire;
  dateCreation: string;
  dateMiseAJour: string;
  
  tarifs: {
    electrique: TarifType;
    premium: TarifType;
    handicape: TarifType;
    standard: TarifType;
  };
  places: PlacesDisponibles;
}