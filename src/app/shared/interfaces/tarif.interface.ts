export interface Tarif {
  _id?: string; // ID MongoDB auto-généré

  parking: string; // Référence à l'ID du parking

  type: 'STANDARD' | 'PREMUIM' | 'HANDICAPE' | 'ELECTRIQUE';

  description?: string;

  tarifHoraire?: number;
  tarifJournalier?: number;
  tarifMensuel?: number;
  tarifReduit?: number;

  dateDebut?: Date;
  dateFin?: Date;

  createdBy?: string; // Référence à l'utilisateur

  createdAt?: Date;
  updatedAt?: Date;

  estActif?: boolean; // Propriété virtuelle (calculée côté backend)
}
