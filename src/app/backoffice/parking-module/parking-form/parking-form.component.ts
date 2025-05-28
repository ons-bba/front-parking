import { CommonModule } from '@angular/common';
import { Horaire, Prestation } from './../../../shared/interfaces/parking.interface';
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
  parkingForm!:FormGroup
  isEditMode =false;
  parkingId : string | null = null;
  isLoading = false;
  
  constructor(
    private fb : FormBuilder,
    private parkingService : ParkingService,
    private route : ActivatedRoute,
    public router : Router
  ){
    this.parkingForm = this.fb.group({
      nom : ['', Validators.required,Validators.maxLength(100)],
      statut : ['OUVERT', Validators.required],
      placesTotal : ['', Validators.required,Validators.min(1)],
      localisation: this.fb.group({
        type : ['Point'],
        coordinates : [[0,0], Validators.required]
      }),
      Horaire : this.fb.group({
        ouverture : ['08:00', [Validators.pattern(/^([0-1][0-9]|2[0-3]):[0-5][0-9]$/)]],
        fermeture : ['20:00', [Validators.pattern(/^([0-1][0-9]|2[0-3]):[0-5][0-9]$/)]]
      }),
       prestation: [[]]
    });
   
  }  // fin constructeur

  ngOnInit(): void {
   this.parkingId = this.route.snapshot.paramMap.get('id');
   this.isEditMode = !! this.parkingId;

   if(this.isEditMode && this.parkingId){
    this.loadParkingData(this.parkingId)
   }
  } // fin methode ngOnInit


  loadParkingData(id : string) : void{
    this.isLoading = true;
    this.parkingService.getParkingById(id).subscribe({
      next : (parking)=>{
        this.parkingForm.patchValue(parking);
        this.isLoading = false;
      },
      error : (err)=>{
        console.error('Erreur lors du chargement',err);
        this.isLoading = false
      }
    })

  }

  // onsubmit

  onSubmit():void {
    if(this.parkingForm.invalid){
      return 
    }
    this.isLoading = true;
    const parkingData = this.parkingForm.value;
    if(this.isEditMode && this.parkingId){
      this.parkingService.updateParking(this.parkingId,parkingData).subscribe({
        next : ()=> {
          this.router.navigate(['parkings'])
        },
        error : (err)=>{
          console.error('Erreur lors de la mise à jour',err);
          this.isLoading = false;
        }
      })
    }else {
      this.parkingService.createParking(parkingData).subscribe({
        next : (parking)=>{
          this.router.navigate(['/parkings'])
        },
        error : (err)=>{
         console.error('Erreur lors de la creation',err);
         this.isLoading = false;
         

        }
      })
    }
  }

  ///update coordonitas 

  updateCoordinates(index : number,event:any):void{
    const coordinates = [...this.parkingForm.get('localisation.coordinates')?.value];
    coordinates[index] = parseFloat(event.target.value);
    this.parkingForm.get('localisation.coordinates')?.setValue(coordinates)
  }

  



}
