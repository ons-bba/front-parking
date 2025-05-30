import { Parking } from './../shared/interfaces/parking.interface';

import { searchParkingService } from '../services/search-parking.service';
import { GoogleMapsModule,MapMarker } from '@angular/google-maps';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card'
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner'

import { MatChipsModule } from '@angular/material/chips';
import {GeolocationService} from '../services/geolocation.service'
import { CommonModule } from '@angular/common';
import {MatSnackBar} from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-parking-search',
  imports: [MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatProgressSpinnerModule,
    GoogleMapsModule,
    MatChipsModule,
    CommonModule,
    MapMarker,
    

    
    
  ],
  templateUrl: './search-parking.component.html',
  styleUrl: './search-parking.component.scss',
  standalone : true,
})
export class SearchParkingComponent implements OnInit {
currentCity: any;
openReservationDialog(_t73: any) {
throw new Error('Method not implemented.');
}
isFavorite(arg0: any) {
throw new Error('Method not implemented.');
}
toggleFavorite(_t73: any) {
throw new Error('Method not implemented.');
}
  parkings : Parking[] = [];
  loading : boolean = true;
  error: string |null = null;
  currentPosition:{lat:number,lng:number} | null=null;
  
  selectedParking: Parking | null=null;
  center: google.maps.LatLngLiteral = {
  lat: 36.8065,
  lng: 10.1815
};


  constructor(private geolocationService:GeolocationService,
    private searchParkingService:searchParkingService,
    private snackBar : MatSnackBar,
    private http : HttpClient

  ){
    
  }

  ngOnInit():void{
    this.getUserLocation();

  }
  async getUserLocation():Promise<void>{

    this.loading = true;
    this.error = null;

    try {
      const position = await this.geolocationService.getCurrentPosition();
      this.currentPosition = {
        lat : position.coords.latitude,
        lng: position.coords.longitude
      }
      this.loadParkings();
    }catch(err){
      this.error = typeof err ==='string' ? err : 'Erreur de geolocalisation';
      console.error(err);
      this.loading = false;

    }

  }

  loadParkings():void{

    if(!this.currentPosition) return;

    this.searchParkingService.getNearbyParkings(this.currentPosition.lat,this.currentPosition.lng)
    .subscribe({
      next : (parkings)=> {
        this.parkings = parkings;
        this.loading = false;
        console.log(parkings)
      },
      error : (err)=>{
        this.error = 'Erreur lors du chargement des parkings';
        this.loading = false;
        console.log(err)
      }
    })

  }
  selectParking(parking:Parking){
    this.selectedParking = parking

  }
  openDirections(parking:Parking):void{
    if(!parking?.localisation?.coordinates) return 

    const [lng,lat] = parking.localisation.coordinates;
    const url = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}&travelmode=driving`
    window.open(url,'_blank')
    
    

  }
 







  refreshPosition():void{
    this.getUserLocation();
    
  }

}
