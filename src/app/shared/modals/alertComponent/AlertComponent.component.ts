// alert.component.ts
import { Component, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {NgClass} from '@angular/common';
import {MatButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';


 export interface AlertData {
  message: string;
  type: 'success' | 'error';
}

@Component({
  selector: 'app-alert',
  standalone: true,
  template: `
    <div class="alert-container" [ngClass]="data.type">
      <div class="icon">
        <mat-icon>{{ data.type === 'success' ? 'check_circle' : 'error' }}</mat-icon>
      </div>
      <div class="message">{{ data.message }}</div>
      <button (click)="onDismiss()" style="background: white;color:#000000;font-weight: bold" mat-flat-button>
        Close
      </button>
    </div>
  `,
  imports: [
    NgClass,
    MatIcon,
    MatButton
  ],
  styles: [`
    .alert-container {
      padding: 24px;
      text-align: center;
      min-width: 300px;
    }

    .success {
      background-color: #4CAF50;
      color: white;
    }

    .error {
      background-color: #f44336;
      color: white;
    }

    .icon mat-icon {
      font-size: 48px;
      width: 48px;
      height: 48px;
    }

    button {
      margin-top: 16px;
    }
  `]
})
export class AlertComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: AlertData, private dialog:  MatDialogRef<AlertComponent>
  ) {}

  onDismiss(): void {
    this.dialog.close();
  }
}
