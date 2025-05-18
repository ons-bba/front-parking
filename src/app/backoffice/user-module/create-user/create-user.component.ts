// create-user.component.ts
import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import {MatError, MatFormField, MatInput, MatLabel} from '@angular/material/input';
import {NgForOf, NgIf} from '@angular/common';
import {MatSelect} from '@angular/material/select';
import {MatOption} from '@angular/material/core';
import {MatButton} from '@angular/material/button';

const PHONE_REGEX = /^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]*$/;

@Component({
  selector: 'app-create-user',
  standalone:true,
  imports: [ReactiveFormsModule, MatFormField, MatLabel, MatInput, MatFormField, NgIf, MatSelect, MatOption, NgForOf, MatSelect, MatButton,MatError],
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss'],
})
export class CreateUserComponent {
  roles = ['CONDUCTEUR', 'OPERATEUR', 'ADMIN'];
  sexes = ['HOMME', 'FEMME'];

  userForm: FormGroup;
  imagePreview: string | ArrayBuffer | null = null;
  selectedFile: File | null = null;
  isSubmitting = false;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private snackBar: MatSnackBar
  ) {
    this.userForm = this.fb.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      email: [
        '',
        [Validators.required, Validators.email],
      ],
      mot_de_passe: [
        '',
        [Validators.required, Validators.minLength(8)],
      ],
      telephone: ['', [Validators.pattern(PHONE_REGEX)]],
      role: ['CONDUCTEUR', Validators.required],
      sex: ['HOMME', Validators.required],
      image: [null],
    });
  }

  onFileChange(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.selectedFile = file;

      // Preview image
      const reader = new FileReader();
      reader.onload = e => {
        this.imagePreview = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit() {
    if (this.userForm.invalid) {
      this.snackBar.open('Veuillez corriger les erreurs dans le formulaire.', 'Fermer', {
        duration: 3000,
      });
      return;
    }

    this.isSubmitting = true;

    // Prepare FormData for multipart/form-data upload
    const formData = new FormData();
    Object.entries(this.userForm.value).forEach(([key, value]) => {
      if (key !== 'image') {
        formData.append(key, value as string);
      }
    });
    if (this.selectedFile) {
      formData.append('file', this.selectedFile, this.selectedFile.name);
    }

    // Replace with your backend URL
    this.http.post('/api/users/register', formData).subscribe({
      next: (res: any) => {
        this.isSubmitting = false;
        this.snackBar.open(res.message || 'Utilisateur créé avec succès!', 'Fermer', {
          duration: 4000,
        });
        this.userForm.reset({
          role: 'CONDUCTEUR',
          sex: 'HOMME',
        });
        this.imagePreview = null;
        this.selectedFile = null;
      },
      error: (err) => {
        this.isSubmitting = false;
        const msg = err?.error?.message || 'Erreur lors de la création de l\'utilisateur';
        this.snackBar.open(msg, 'Fermer', { duration: 4000 });
      }
    });
  }
}
