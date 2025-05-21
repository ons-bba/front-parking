import { Component } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {AuthService, Role} from '../services/auth.service';
import {ModalService} from '../shared/modals/modal.service';
import {DispatcherService} from '../services/dispatcher-service.service';
import {Router, RouterLink} from '@angular/router';
import {DISPATCHER_ACTIONS} from '../services/data/shared.constant';
export interface LoginInterface {
  email :string, password :string
}
@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    CommonModule,
    RouterLink
  ],
  templateUrl: './login.component.html',
  standalone: true,
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm: FormGroup;
  hidePassword = true;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private modals: ModalService,
    private dispatcher: DispatcherService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    if (this.loginForm.invalid) return;

    this.dispatcher.dispatch(DISPATCHER_ACTIONS.SPINNER, true);

    this.authService.login(this.loginForm.value as LoginInterface).subscribe({
      next: (res: any) => {
        this.dispatcher.dispatch(DISPATCHER_ACTIONS.SPINNER, false);
        this.modals.showAlert(res.message || 'Connexion réussie', 'success');

        this.authService.storeLoginData(res.token, res.user);

        if (res.user.role === Role.ADMIN) {
          this.router.navigate(['/backoffice']);
        } else {
          this.router.navigate(['/front-office']);
        }

      },
      error: (err: any) => {
        this.dispatcher.dispatch(DISPATCHER_ACTIONS.SPINNER, false);

        if (err.status === 400 && err.error.errors) {
          const errorMessages = err.error.errors.map((e: any) => e.message).join('\n');
          this.modals.showAlert(errorMessages, 'error');
        } else {
          this.modals.showAlert(err.error.message || 'Erreur de connexion', 'error');
        }
      }
    });
  }
}
