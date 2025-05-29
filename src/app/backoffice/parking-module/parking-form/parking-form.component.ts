import { CommonModule } from '@angular/common';
import { Horaire, Parking, Prestation, PlacesDisponibles } from './../../../shared/interfaces/parking.interface';
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
  id! : string;
 
 
  constructor(private fb:FormBuilder,
    private parkingService:ParkingService,
    private route:ActivatedRoute
  ){

    this.parkingForm = this.fb.group({
      nom:[''] // initialisation du champ nom
    })

    
  }




  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')
    console.log(id)


    
    

    this.parkingService.getParkingById(id: string).subscribe({
      next : (parking)=>{
        console.log(parking)
        this.parkingForm.patchValue({
          nom : parking.nom
        })       
        
      },
      error:(err)=>{
        console.error(err.status)
      }


    })
    
  }




  
  loadParking(id : string){
    this.parkingService.getParkingById('id')
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