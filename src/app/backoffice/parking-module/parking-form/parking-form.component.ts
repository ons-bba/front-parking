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
  parkingId : string 
 
 
  constructor(private fb:FormBuilder,
    private parkingService:ParkingService,
    private route:ActivatedRoute
  ){}

  ngOnInit(): void {

 
     this.parkingForm = this.fb.group({
      nom:[''] // initialisation du champ nom
    });
      this.parkingId =this.route.snapshot.paramMap('id')

    
    

    this.parkingService.getParkingById(this.parkingId).subscribe({
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

 




  
  
  
  
  
  onSubmit():void{
    if(this.parkingForm.valid){
      const data = this.parkingForm.value;
      console.log("valeur de formulaire:",data)
    }else {
      console.log('Formulaire invalid')
    }
  }

  
  }