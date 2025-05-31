
import { Component, EventEmitter, OnInit, Output } from '@angular/core';


import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { ParkingFormComponent } from '../parking-form/parking-form.component';
import { ParkingListComponent } from '../parking-list/parking-list.component';
import { PlaceformComponent } from "../placeform/placeform.component";


@Component({
  selector: 'app-parking-management',
  imports: [CommonModule, ReactiveFormsModule, ParkingFormComponent, ParkingListComponent, PlaceformComponent],
  templateUrl: './parking-management.component.html',
  styleUrl: './parking-management.component.scss'
})
export class ParkingManagementComponent {


  showParkingForm = false;
  selectedParking: any = null;
  showList = false
  showPlace=false

  // Méthode pour afficher le formulaire
  showAddParkingForm() {
    this.selectedParking = null;
    this.showParkingForm = true;
    this.showList = false;
  }

  // Méthode pour masquer le formulaire
  hideParkingForm() {
    this.showParkingForm = false;
  }

  // Méthode appelée quand un parking est créé
  onParkingCreated(newParking: any) {
    this.hideParkingForm();
    // Ici vous pourriez actualiser la liste des parkings
    console.log('Nouveau parking créé:', newParking);
  }


  showListeParking(){
    this.showList = true
    this.showParkingForm = false;

  }
  showPlaceListe(){
    this.showList = true;
    this.showParkingForm= false;
    this.showList = false

  }
 

}
