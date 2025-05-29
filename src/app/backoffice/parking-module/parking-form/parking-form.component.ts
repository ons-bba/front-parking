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
 
 
  constructor(private formBuilder:FormBuilder,
    private parkingService:ParkingService,
    private route:ActivatedRoute
  ){}




  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')


    
    this.parkingForm = this.formBuilder.group({
      nom:[''] // initialisation du champ nom
    })

    this.parkingService.getParkingById('id').subscribe({
      next : (parking)=>{
        this.parkingForm = this.parkingForm.patchValue({
          nom : parking.nom
        })
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