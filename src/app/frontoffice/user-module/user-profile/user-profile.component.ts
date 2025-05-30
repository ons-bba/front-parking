// user-profile.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from '../../../shared/interfaces/interfaces.general';
import { AuthService } from '../../../services/auth.service';
import { UserService } from '../../../backoffice/user-module/services/user.service';
import {DatePipe, NgForOf, NgIf} from '@angular/common';
import { MatCard, MatCardContent, MatCardTitle } from '@angular/material/card';
import { MatFormField, MatInput, MatLabel } from '@angular/material/input';
import { MatSelect } from '@angular/material/select';
import { MatOption } from '@angular/material/core';
import {MatButton, MatMiniFabButton} from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatTooltipModule } from '@angular/material/tooltip';
import {MatProgressSpinner} from '@angular/material/progress-spinner';
import {PHONE_REGEX} from '../../../backoffice/user-module/create-user/create-user.component';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  standalone: true,
  imports: [
    NgIf,
    MatCard,
    MatCardContent,
    ReactiveFormsModule,
    MatFormField,
    MatLabel,
    MatInput,
    MatSelect,
    MatOption,
    MatButton,
    MatIconModule,
    MatDividerModule,
    MatTooltipModule,
    MatMiniFabButton,
    MatProgressSpinner,
    DatePipe,
    NgForOf
  ],
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  profileForm!: FormGroup;
  currentUser!: User;
  isEditMode = false;
  selectedFile: File | null = null;
  previewUrl: string | ArrayBuffer | null = null;
  isLoading = false;
  private userSub!: Subscription;
  tempPreviewUrl: string | ArrayBuffer | null = null; // New property for temporary preview
  sexes = ['HOMME', 'FEMME'];


  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private userService: UserService,
  ) { }

  ngOnInit(): void {
    this.userSub = this.authService.currentUser$.subscribe(user => {
      if (user) {
        this.currentUser = user;
        this.buildForm();
        this.resetImagePreview(); // Reset preview when user changes
      }
    });
  }
  resetImagePreview(): void {
    this.tempPreviewUrl = null;
    this.selectedFile = null;
  }

  buildForm(): void {
    this.profileForm = this.fb.group({
      nom: [{ value: this.currentUser.nom, disabled: true }, Validators.required],
      prenom: [{ value: this.currentUser.prenom, disabled: true }, Validators.required],
      email: [{ value: this.currentUser.email, disabled: true }],
      telephone: [{ value: this.currentUser.telephone, disabled: true }, [Validators.required, Validators.pattern(PHONE_REGEX)]],
      role: [{ value: this.currentUser.role, disabled: true }],
      status: [{ value: this.currentUser.status, disabled: true }],
      sex: [{ value: this.currentUser.sex, disabled: true }, Validators.required],
      points_fidelite: [{ value: this.currentUser.points_fidelite, disabled: true }]
    });
  }


  toggleEditMode(): void {
    this.isEditMode = !this.isEditMode;

    if (this.isEditMode) {
      // Enable editable fields
      this.profileForm.get('nom')?.enable();
      this.profileForm.get('prenom')?.enable();
      this.profileForm.get('telephone')?.enable();
      this.profileForm.get('sex')?.enable();
    } else {
      // Cancel edit - reset form and disable fields
      this.buildForm();
    }
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;

      const reader = new FileReader();
      reader.onload = () => {
        this.tempPreviewUrl = reader.result; // Use tempPreviewUrl for preview
      };
      reader.readAsDataURL(file);
    }
  }

// user-profile.component.ts
  uploadImage(): void {
    if (!this.selectedFile || !this.currentUser) return;

    this.isLoading = true;
    this.userService.uploadUserImage(this.currentUser._id, this.selectedFile).subscribe({
      next: (response) => {
        this.snackBar.open('Profile image updated successfully!', 'Close', {
          duration: 3000,
          panelClass: ['success-snackbar']
        });

        // Clear temporary preview
        this.tempPreviewUrl = null;
        this.selectedFile = null;
        this.isLoading = false;

        // No need to update currentUser here - subscription will handle it
      },
      error: () => {
        this.snackBar.open('Image upload failed.', 'Close', {
          duration: 3000,
          panelClass: ['error-snackbar']
        });
        this.isLoading = false;
      }
    });
  }

  getUserImage(): string {
    if (this.currentUser?.image) {
      // Add cache buster to prevent caching issues
      return `http://localhost:3000${this.currentUser.image}?t=${Date.now()}`;
    }
    return 'assets/default-profile.png';
  }

  onSubmit(): void {
    if (this.profileForm.valid) {
      const updatedUser = { ...this.currentUser, ...this.profileForm.getRawValue() };

      this.userService.updateUser(updatedUser, this.currentUser._id).subscribe({
        next: (response) => {
          this.snackBar.open('Profile updated successfully!', 'Close', {
            duration: 3000,
            panelClass: ['success-snackbar']
          });

          // Update local state from response if available
          if (response.user) {
            this.currentUser = response.user;
          } else {
            // Fallback to our updatedUser
            this.currentUser = updatedUser;
          }

          this.isEditMode = false;
          this.buildForm();
        },
        error: () => {
          this.snackBar.open('Failed to update profile.', 'Close', {
            duration: 3000,
            panelClass: ['error-snackbar']
          });
        }
      });
    }
  }

  ngOnDestroy(): void {
    if (this.userSub) {
      this.userSub.unsubscribe();
    }
  }

  protected readonly isSecureContext = isSecureContext;
}
