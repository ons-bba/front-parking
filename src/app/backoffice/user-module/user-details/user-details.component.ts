import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {User} from '../../../shared/interfaces/interfaces.general';
import {Role, Sex, Statut} from '../../../services/auth.service';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {UserService} from '../services/user.service';
import {DispatcherService} from '../../../services/dispatcher-service.service';
import {DISPATCHER_ACTIONS} from '../../../services/data/shared.constant';
import {MatError, MatFormField, MatInput, MatLabel} from '@angular/material/input';
import {MatIcon} from '@angular/material/icon';
import {DatePipe, NgForOf, NgIf, TitleCasePipe} from '@angular/common';
import {MatDivider} from '@angular/material/divider';
import {MatCard, MatCardActions, MatCardContent, MatCardHeader, MatCardTitle} from '@angular/material/card';
import {MatSelect} from '@angular/material/select';
import {MatOption} from '@angular/material/core';
import {MatButton} from '@angular/material/button';



const PHONE_REGEX = /^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]*$/;

@Component({
  imports: [
    MatFormField,
    MatLabel,
    MatIcon,
    MatError,
    ReactiveFormsModule,
    MatInput,
    NgIf,
    MatDivider,
    MatCardActions,
    MatSelect,
    MatOption,
    NgForOf,
    TitleCasePipe,
    MatCard,
    MatCardHeader,
    MatButton,
    MatCardContent,
    RouterLink, MatCardTitle, DatePipe
  ],
  selector: 'app-user-details',
  standalone: true,
  styleUrl: './user-details.component.scss',
  templateUrl: './user-details.component.html'
})
export class UserDetailsComponent {
  userForm!: FormGroup;
  isEditing = false;
  user!: User;
  roles = Object.values(Role);
  sexes = Object.values(Sex);
  statuts = Object.values(Statut);

  constructor(
    private readonly fb: FormBuilder,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly userService: UserService,
    private readonly dispatcher: DispatcherService,
  ) {}

  ngOnInit() {
    this.dispatcher.dispatch(DISPATCHER_ACTIONS.SPINNER, true);
    this.initializeForm();
    this.loadUser();
  }

  get f() {
    return this.userForm.controls;
  }

  initializeForm() {
    this.userForm = this.fb.group({
      nom: [{ value: '', disabled: true }, Validators.required],
      prenom: [{ value: '', disabled: true }, Validators.required],
      email: [{ value: '', disabled: true }, [Validators.required, Validators.email]],
      telephone: [{ value: '', disabled: true }, [Validators.pattern(PHONE_REGEX)]],
      role: [{ value: '', disabled: true }, Validators.required],
      sex: [{ value: '', disabled: true }, Validators.required],
      status: [{ value: '', disabled: true }, Validators.required]
    });
  }

  loadUser() {
    const userId = this.route.snapshot.paramMap.get('id');
    if (userId) {
      this.userService.getUserById(userId).subscribe(user => {
        this.user = user.user;
        this.userForm.patchValue(user.user);
        this.dispatcher.dispatch(DISPATCHER_ACTIONS.SPINNER, false);
      });
    }
  }

  toggleEdit() {
    this.isEditing = !this.isEditing;
    if (this.isEditing) {
      this.userForm.enable();
      this.userForm.get('email')?.disable();
    } else {
      this.userForm.disable();
      this.userForm.patchValue(this.user);
    }
  }

  saveChanges() {
    if (this.userForm.valid) {
      this.dispatcher.dispatch(DISPATCHER_ACTIONS.SPINNER, true);
      const updatedUser = {
        ...this.user,
        ...this.userForm.value,
        sex: this.userForm.value.sex as Sex,
        status: this.userForm.value.status as Statut
      };

      this.userService.updateUser(updatedUser, this.user._id).subscribe({
        next: () => {
          this.user = updatedUser;
          this.dispatcher.dispatch(DISPATCHER_ACTIONS.SPINNER, false);
          this.toggleEdit();
        },
        error: (err) => console.error('Update failed', err)
      });
    }
  }



}
