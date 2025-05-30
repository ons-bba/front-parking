// user-profile.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from '../../../shared/interfaces/interfaces.general';
import { AuthService } from '../../../services/auth.service';
import { UserService } from '../../../backoffice/user-module/services/user.service';
import {DatePipe, NgIf} from '@angular/common';
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
    DatePipe
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

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private userService: UserService,
  ) { }

  ngOnInit(): void {
    this.currentUser = this.authService.getUser() as User;
    this.previewUrl = this.getUserImage();
    this.buildForm();
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

  getUserImage(): string {
    if (this.currentUser?.image) {
      return "http://localhost:3000"+this.currentUser.image;
    }
    return 'assets/default-profile.png'; // Fallback image
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

      // Create preview
      const reader = new FileReader();
      reader.onload = () => {
        this.previewUrl = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }

  uploadImage(): void {
    if (!this.selectedFile || !this.currentUser) return;

    this.isLoading = true;
    this.userService.uploadUserImage(this.currentUser._id, this.selectedFile).subscribe({
      next: (response) => {
        this.snackBar.open('Profile image updated successfully!', 'Close', {
          duration: 3000,
          panelClass: ['success-snackbar']
        });
        // update image URL and local user
        this.currentUser.image = response.imagePath; // adjust to match API response
        this.previewUrl = this.getUserImage();
        this.userService.setCurrentUser(this.currentUser);
        this.isLoading = false;
        this.selectedFile = null;
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

  onSubmit(): void {
    if (this.profileForm.valid) {
      const updatedUser = { ...this.currentUser, ...this.profileForm.getRawValue() };

      this.userService.updateUser(updatedUser, this.currentUser._id).subscribe({
        next: (data) => {
          console.log(data)
          this.snackBar.open('Profile updated successfully!', 'Close', {
            duration: 3000,
            panelClass: ['success-snackbar']
          });
          // Update current user in auth service
          this.userService.setCurrentUser(updatedUser);
          this.currentUser = updatedUser;
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

}
