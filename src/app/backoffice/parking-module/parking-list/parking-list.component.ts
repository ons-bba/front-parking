
import { Component, OnInit } from '@angular/core';
import { Parking } from '../../../shared/interfaces/parking.interface';
import { ParkingService } from '../services/parking.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
standalone :true,
selector: 'app-parking-list',
imports: [CommonModule,
RouterModule
],
templateUrl: './parking-list.component.html',
styleUrl: './parking-list.component.scss'
})
export class ParkingListComponent implements OnInit{
parkings : Parking[]=[];
displayedColumns = ['nom','statut','places','horaires','actions'];
isLoading = true;
errorMessage ='';

constructor(private parkingService : ParkingService){

}
ngOnInit(): void {
this.loadParkings();
}

loadParkings():void {

this.parkingService.getAllParkings().subscribe({
next : (data)=>{this.parkings=data
this.isLoading = false
},
error : (err)=>console.error("Erreur lors de la chargement",err)
});

}

deleteParking(id:string):void {
if(confirm('supprimer un parking?')){
this.parkingService.deleteParking(id).subscribe({
next : ()=>this.loadParkings(),
error: (err)=> console.error('Erreur lors de la supprission',err)
});
}
}
}