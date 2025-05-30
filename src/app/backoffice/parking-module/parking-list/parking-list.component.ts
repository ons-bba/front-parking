import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { ParkingService } from '../services/parking.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Parking } from '../../../shared/interfaces/parking.interface';


@Component({
  standalone :true,
  selector: 'app-parking-list',
  imports: [CommonModule,
    RouterModule
  ],
  templateUrl: './parking-list.component.html',
  styleUrl: './parking-list.component.scss'
})
export class ParkingListComponent {
  @Input() parkings: Parking[] = [];
  @Output() selectParking = new EventEmitter<Parking>();
  selectedId: string | null = null;

  onSelect(parking: Parking) {
    this.selectedId = parking._id;
    this.selectParking.emit(parking);
  }
  


}
