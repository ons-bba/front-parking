import { Component, Inject, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { BookingService } from '../services/booking.service';
import moment from 'moment';
import { GoogleMapsModule,MapMarker } from '@angular/google-maps';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card'
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { MatChipsModule } from '@angular/material/chips';
import { CommonModule } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';


@Component({
  standalone:true,
  selector: 'app-reservation-dialog',
  imports: [ 
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatSnackBarModule,
    ReactiveFormsModule, 
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatProgressSpinnerModule,
    GoogleMapsModule,
    MatChipsModule,
    CommonModule,
    
  ],
  
  templateUrl: './reservation-dialog.component.html',
  styleUrl: './reservation-dialog.component.scss'
})
export class ReservationDialogComponent implements OnInit{

  reservationForm: FormGroup;
  loading = false;
  placeTypes = ['STANDARD', 'HANDICAPE', 'ELECTRIQUE', 'MOTO'];
  durationOptions = [
    { value: 1, label: '1 heure' },
    { value: 2, label: '2 heures' },
    { value: 4, label: '4 heures' },
    { value: 8, label: '8 heures' },
    { value: 24, label: '24 heures' }
  ];

  constructor(
    public dialogRef: MatDialogRef<ReservationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private bookingService: BookingService,
    private snackBar: MatSnackBar
  ) {
    this.reservationForm = this.fb.group({
      typePlace: ['STANDARD', Validators.required],
      dateDebut: [new Date(), Validators.required],
      duree: [1, Validators.required],
      longitude: [data.parking.localisation.coordinates[0], Validators.required],
      latitude: [data.parking.localisation.coordinates[1], Validators.required]
    });
  }

  ngOnInit(): void {
    // Si l'utilisateur a une position actuelle, on l'utilise
    if (this.data.currentPosition) {
      this.reservationForm.patchValue({
        longitude: this.data.currentPosition.lng,
        latitude: this.data.currentPosition.lat
      });
    }
  }

  onSubmit(): void {
    if (this.reservationForm.invalid) {
      return;
    }

    this.loading = true;
    const formData = this.reservationForm.value;
    formData.dateDebut = moment(formData.dateDebut).format();

    this.bookingService.createBooking(formData).subscribe({
      next: (response) => {
        this.snackBar.open('Réservation confirmée!', 'Fermer', {
          duration: 5000,
          panelClass: ['success-snackbar']
        });
        this.dialogRef.close(response);
      },
      error: (err) => {
        this.snackBar.open(`Erreur: ${err.error.message || 'Une erreur est survenue'}`, 'Fermer', {
          duration: 5000,
          panelClass: ['error-snackbar']
        });
        this.loading = false;
      },
      complete: () => {
        this.loading = false;
      }
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

}
