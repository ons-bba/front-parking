import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatError, MatFormField, MatInput, MatLabel } from '@angular/material/input';
import { NgForOf, NgIf } from '@angular/common';
import { MatSelect } from '@angular/material/select';
import { MatOption } from '@angular/material/core';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { AuthService } from '../services/auth.service';
import {DispatcherService} from '../services/dispatcher-service.service';
import {DISPATCHER_ACTIONS} from '../services/data/shared.constant';
import {Router, RouterLink} from '@angular/router';

// Updated phone regex to match backend pattern
const PHONE_REGEX = /^[0-9]{8}$/;
// Password regex from backend requirements
const PASSWORD_PATTERN = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[.@$!%*?&])[A-Za-z\d.@$!%*?&]{8,}$/;


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormField,
    MatLabel,
    MatInput,
    NgIf,
    MatSelect,
    MatOption,
    NgForOf,
    MatButton,
    MatError,
    MatIcon,
    RouterLink
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  roles = ['CONDUCTEUR', 'OPERATEUR', 'ADMIN'];
  sexes = ['HOMME', 'FEMME'];
  errorMessage: string = '';

  userForm: FormGroup;
  imagePreview: string | ArrayBuffer | null = null;
  selectedFile: File | null = null;

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private authService: AuthService,
    private dispatcher:DispatcherService,
    private router:Router
  ) {
    this.userForm = this.fb.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mot_de_passe: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.pattern(PASSWORD_PATTERN)
        ]
      ],
      telephone: ['', [Validators.pattern(PHONE_REGEX)]],
      role: ['CONDUCTEUR', Validators.required],
      sex: ['HOMME', Validators.required],
      image: [null]
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
      this.showError('Veuillez corriger les erreurs dans le formulaire.');
      return;
    }

    this.errorMessage = '';

    const formData = new FormData();

    // Manually append all fields to ensure correct structure
    formData.append('nom', this.userForm.value.nom);
    formData.append('prenom', this.userForm.value.prenom);
    formData.append('email', this.userForm.value.email);
    formData.append('mot_de_passe', this.userForm.value.mot_de_passe);
    formData.append('telephone', this.userForm.value.telephone.toString().trim() || '');
    formData.append('role', this.userForm.value.role);
    formData.append('sex', this.userForm.value.sex);

    if (this.selectedFile) {
      formData.append('image', this.selectedFile, this.selectedFile.name);
    }
    this.dispatcher.dispatch(DISPATCHER_ACTIONS.SPINNER,true);
    this.authService.createUser(formData).subscribe({
      next: (res: any) => {
        this.dispatcher.dispatch(DISPATCHER_ACTIONS.SPINNER,false);
        this.showSuccess(res.message || 'Utilisateur créé avec succès!');
        this.resetForm();

      },
      error: (err) => {
        this.dispatcher.dispatch(DISPATCHER_ACTIONS.SPINNER,false);
        this.handleError(err);
      }
    });
  }

  private showError(message: string): void {
    this.snackBar.open(message, 'Fermer', { duration: 4000 });
  }

  private showSuccess(message: string): void {
    this.snackBar.open(message, 'Fermer', {
      duration: 4000,
      panelClass: ['success-snackbar']
    });
  }

  private handleError(err: any): void {
    console.log(err)
    let errorMessage = err?.error?.message || 'Erreur lors de la création de l\'utilisateur';

    if (err.error?.errors) {
      errorMessage = err.error.errors
        .map((e: any) => `${this.translateFieldName(e.field)}: ${e.message}`)
        .join('\n');
    }

    this.errorMessage = errorMessage;
    this.showError(errorMessage);
  }

  private translateFieldName(field: string): string {
    const translations: { [key: string]: string } = {
      'nom': 'Nom',
      'prenom': 'Prénom',
      'email': 'Email',
      'mot_de_passe': 'Mot de passe',
      'telephone': 'Téléphone',
      'role': 'Rôle',
      'sex': 'Sexe',
      'image': 'Image'
    };
    return translations[field] || field;
  }

  private resetForm(): void {
    this.userForm.reset({
      role: 'CONDUCTEUR',
      sex: 'HOMME'
    });
    this.imagePreview = null;
    this.selectedFile = null;
  }
}
