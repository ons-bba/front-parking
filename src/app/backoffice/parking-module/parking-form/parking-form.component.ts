import { CommonModule } from '@angular/common';
import { Horaire, Parking, Prestation, PlacesDisponibles, Localisation } from './../../../shared/interfaces/parking.interface';
import { ParkingService } from './../services/parking.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';



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
export class ParkingFormComponent implements OnInit {
  parkingForm! : FormGroup;
  parkingId : string | null = null
 
 
  constructor(private fb:FormBuilder,
    private parkingService:ParkingService,
    private route:ActivatedRoute
  ){}

  ngOnInit(): void {

 
     this.parkingForm = this.fb.group({
      nom:[''],
      statut:['FERME',Validators.required],
      placesTotal : [null,Validators.minLength(0)],
      placesDisponible:[null,Validators.minLength(0)],
      horaires : this.fb.group({
        ouverture : ['08:00', [Validators.required, Validators.pattern(/^([0-1][0-9]|2[0-3]):[0-5][0-9]$/)]],
        fermeture:['20:00', [Validators.required, Validators.pattern(/^([0-1][0-9]|2[0-3]):[0-5][0-9]$/)]]
      }),
      localisation : this.fb.group({
        coordinates:this.fb.array([[0],[0]])
      })
    });
      this.parkingId =this.route.snapshot.paramMap.get('id')
      
      if(this.parkingId !== null){
        this.loadParking(this.parkingId)
      }

    
    

    
  }

  loadParking(id:string){
    this.parkingService.getParkingById(id).subscribe({
      next : (parking:Parking)=>{
        console.log("the parking",parking)
        this.parkingForm.patchValue({
          nom : parking.nom,
          statut:parking.statut,
          placesTotal:parking.placesTotal,
          placesDisponible:parking.placesDisponible,
          horaires : parking.horaires,
          localisation : parking.localisation.coordinates
        });
        console.log(this.parkingForm)
      }
    })
  }

  getLongitude(){
    const  
  }

 




  
  
  
  
  
  onSubmit():void{
    if(this.parkingForm.valid){
      const data = this.parkingForm.value;
      console.log("valeur de formulaire:",data)
    }else {
      console.log('Formulaire invalid')
    }
  }

  
  }