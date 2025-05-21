// forgot-password.component.ts
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AuthService } from '../../../services/auth.service';
import { ModalService } from '../../modals/modal.service';
import { DispatcherService } from '../../../services/dispatcher-service.service';
import {DISPATCHER_ACTIONS} from '../../../services/data/shared.constant';
import {MatProgressSpinner} from '@angular/material/progress-spinner';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    CommonModule,
    RouterLink,
    MatProgressSpinner,
  ],
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent {
  forgotForm: FormGroup;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private modals: ModalService,
    private dispatcher: DispatcherService,
    private router: Router
  ) {
    this.forgotForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  onSubmit() {
    if (this.forgotForm.invalid) return;

    this.dispatcher.dispatch(DISPATCHER_ACTIONS.SPINNER, true);
    this.isLoading = true;

    this.authService.forgotPassword(this.forgotForm.value).subscribe({
      next: (res: any) => {
        this.dispatcher.dispatch(DISPATCHER_ACTIONS.SPINNER, false);
        this.isLoading = false;
        this.modals.showAlert(res.message || 'Un email de réinitialisation a été envoyé', 'success');
        this.router.navigate(['/login']);
      },
      error: (err) => {
        this.dispatcher.dispatch(DISPATCHER_ACTIONS.SPINNER, false);
        this.isLoading = false;
        this.modals.showAlert(err.error.message || 'Erreur lors de l\'envoi de l\'email', 'error');
      }
    });
  }
}
