import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { CommonModule } from '@angular/common';
import { ParkingService } from '../services/parking.service';

@Component({
  standalone: true,
  selector: 'app-placeform',
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './placeform.component.html',
  styleUrls: ['./placeform.component.scss'] // Fixed 'styleUrl' to 'styleUrls'
})
export class PlaceformComponent implements OnInit {
  @Output() parkingCreated = new EventEmitter<void>();
  isLoading = false;
  form!: FormGroup ;

  constructor(
    private fb: FormBuilder,
    private parkingService: ParkingService
  ) {}

  ngOnInit(): void {
    // Use 'this.form' instead of 'form' (to refer to the class property)
    this.form = this.fb.group({
      nom: ['', [Validators.required, Validators.minLength(3)]],
      adresse: ['', Validators.required],
      capacite: [10, [Validators.required, Validators.min(1), Validators.max(1000)]]
    });
  }

  onSubmit(): void {
    if (this.form?.valid) {
      this.isLoading = true;
      this.parkingService.createParking(this.form.value).subscribe({
        next: () => {
          this.parkingCreated.emit();
          this.form?.reset();
          this.isLoading = false;
        },
        error: (err) => {
          console.error(err);
          this.isLoading = false;
        }
      });
    }
  }
}
