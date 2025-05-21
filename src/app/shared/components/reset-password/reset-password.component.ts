// reset-password.component.ts
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, AbstractControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AuthService } from '../../../services/auth.service';
import { ModalService } from '../../modals/modal.service';
import { DispatcherService } from '../../../services/dispatcher-service.service';
import { DISPATCHER_ACTIONS } from '../../../services/data/shared.constant';
import { MatProgressSpinner } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    CommonModule,
    MatProgressSpinner
  ],
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent {
  resetForm: FormGroup;
  hidePassword = true;
  isLoading = false;
  token: string = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private modals: ModalService,
    private dispatcher: DispatcherService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.route.queryParams.subscribe(params => {
      this.token = params['token'] || '';
    });

    this.resetForm = this.fb.group({
      newPassword: ['', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[.@$!%*?&])[A-Za-z\d.@$!%*?&]{8,}$/)
      ]],
      confirmPassword: ['', [
        Validators.required,
        (control: AbstractControl) => this.passwordMatchValidator(control)
      ]]
    });

    // Update validation when either password changes
    this.resetForm.get('newPassword')?.valueChanges.subscribe(() => {
      this.resetForm.get('confirmPassword')?.updateValueAndValidity();
    });
  }

  private passwordMatchValidator(control: AbstractControl) {
    const newPassword = this.resetForm?.get('newPassword')?.value;
    const confirmPassword = control.value;

    if (newPassword !== confirmPassword) {
      return { notSame: true };
    }
    return null;
  }

  onSubmit() {
    if (this.resetForm.invalid || !this.token) return;

    const payload = {
      token: this.token,
      newPassword: this.resetForm.value.newPassword ,
      confirmPassword : this.resetForm.value.confirmPassword
    };

    this.dispatcher.dispatch(DISPATCHER_ACTIONS.SPINNER, true);
    this.isLoading = true;

    this.authService.resetPassword(payload).subscribe({
      next: (res: any) => {
        this.dispatcher.dispatch(DISPATCHER_ACTIONS.SPINNER, false);
        this.isLoading = false;
        this.modals.showAlert(res.message || 'Mot de passe réinitialisé avec succès', 'success');
        this.router.navigate(['/login']);
      },
      error: (err) => {
        this.dispatcher.dispatch(DISPATCHER_ACTIONS.SPINNER, false);
        this.isLoading = false;
        this.modals.showAlert(err.error.message || 'Erreur lors de la réinitialisation', 'error');
      }
    });
  }
}
