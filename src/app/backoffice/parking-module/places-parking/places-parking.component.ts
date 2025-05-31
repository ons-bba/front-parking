import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PlaceParkingService } from '../services/place-parking.service';

import { CommonModule } from '@angular/common';
import { PlaceformComponent } from "../placeform/placeform.component";
import { Place } from '../../../shared/interfaces/places.interface';


@Component({
  standalone:true,
  selector: 'app-places-parking',
  imports: [
    CommonModule,
    
],
  templateUrl: './places-parking.component.html',
  styleUrl: './places-parking.component.scss'
})
export class PlacesParkingComponent implements OnInit{

@Input() parkingId: string = '682506aabf8cf4df5153a5ef';
places: Place[] = [];
 
  isLoading = false;
  errorMessage = '';

  constructor(private placeParkingService: PlaceParkingService) {}

  ngOnInit(): void {
    this.loadPlaces();
  }

  loadPlaces(): void {
    this.isLoading = true;
    this.placeParkingService.getPlacesByParking(this.parkingId).subscribe({
      next: (places) => {
        this.places = places;
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage = 'Erreur lors du chargement des places';
        this.isLoading = false;
      }
    });
  }

  deletePlace(id: any): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette place ?')) {
      this.placeParkingService.deletePlace(id).subscribe({
        next: () => {
          this.places = this.places.filter(place => place._id !== id);
        },
        error: (err) => {
          this.errorMessage = 'Erreur lors de la suppression';
        }
      });
    }
  }


  // edit place 
  editPlace(arg0: any) {
throw new Error('Method not implemented.');
}
}



