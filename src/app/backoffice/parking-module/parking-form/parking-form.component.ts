import { CommonModule } from '@angular/common';

import { ParkingService } from './../services/parking.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Parking } from '../../../shared/interfaces/parking.interface';





@Component({
  standalone:true,
  selector: 'app-parking-form',
  imports: [ ReactiveFormsModule,
    CommonModule,
    RouterModule
  ],
  templateUrl: './parking-form.component.html',
  styleUrl: './parking-form.component.scss'
})
export class ParkingFormComponent  {
onBack() {
this.back.emit();
}

  @Output() parkingCreated = new EventEmitter<Parking>();
  @Output() back = new EventEmitter<void>()
  parkingForm: FormGroup;
  isLoading = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private parkingService: ParkingService
  ) {
    this.parkingForm = this.fb.group({
      nom: ['', [Validators.required, Validators.maxLength(100)]],
      placesTotal: [1, [Validators.required, Validators.min(1)]],
      statut: ['OUVERT'],
      localisation: this.fb.group({
        type: ['Point'],
        coordinates: [[0, 0], Validators.required] // [longitude, latitude]
      }),
      horaires: this.fb.group({
        ouverture: ['08:00', Validators.pattern(/^([0-1][0-9]|2[0-3]):[0-5][0-9]$/)],
        fermeture: ['20:00', Validators.pattern(/^([0-1][0-9]|2[0-3]):[0-5][0-9]$/)]
      }),
      prestations: [[]]
    });
  }

  onSubmit(): void {
    if (this.parkingForm.valid) {
      this.isLoading = true;
      const formData = {
        ...this.parkingForm.value,
        placesDisponible: this.parkingForm.value.placesTotal // Initialize available spots
      };

      this.parkingService.createParking(formData).subscribe({
        next: (newParking) => {
          this.parkingCreated.emit(newParking);
          this.parkingForm.reset();
          this.isLoading = false;
        },
        error: (err) => {
          this.errorMessage = err.error?.message || 'Erreur lors de la création';
          this.isLoading = false;
        }
      });
    }
  }


updateLongitude(event: Event): void {
  const inputElement = event.target as HTMLInputElement;
  const value = parseFloat(inputElement.value);
  if (!isNaN(value)) {
    const currentCoords = this.parkingForm.get('localisation.coordinates')?.value || [0, 0];
    this.parkingForm.get('localisation.coordinates')?.setValue([value, currentCoords[1]]);
  }
}

updateLatitude(event: Event): void {
  const inputElement = event.target as HTMLInputElement;
  const value = parseFloat(inputElement.value);
  if (!isNaN(value)) {
    const currentCoords = this.parkingForm.get('localisation.coordinates')?.value || [0, 0];
    this.parkingForm.get('localisation.coordinates')?.setValue([currentCoords[0], value]);
  }
}
 
  }

 
 




  
  
  
  
  
 