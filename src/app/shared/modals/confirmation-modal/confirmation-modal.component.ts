import {Component, EventEmitter, Inject, Input, Output} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {animate, style, transition, trigger} from '@angular/animations';
import {MatDivider} from '@angular/material/divider';
import {MatButton} from '@angular/material/button';


export interface ConfirmationModalData {
  title: string;
  message: string;
  confirmButtonText?: string;
  cancelButtonText?: string;
}


@Component({
    selector: 'app-confirmation-modal',
    templateUrl: './confirmation-modal.component.html',
    styleUrl: './confirmation-modal.component.scss',
    standalone: true,
  imports: [
    MatDivider,
    MatButton
  ],
    animations: [
      trigger('materialize', [
        transition(':enter', [
          style({
            transform: 'scale(0) rotateX(90deg)',
            opacity: 0,
            filter: 'blur(10px)'
          }),
          animate('0.4s cubic-bezier(0.68, -0.55, 0.27, 1.55)', style({
            transform: 'scale(1) rotateX(0deg)',
            opacity: 1,
            filter: 'blur(0px)'
          }))
        ]),
        transition(':leave', [
          animate('0.2s cubic-bezier(0.55, 0.085, 0.68, 0.53)', style({
            transform: 'scale(0) rotateX(-90deg)',
            opacity: 0,
            filter: 'blur(10px)'
          }))
        ])
      ])
    ]
  }
)
export class ConfirmationModalComponent {
  @Input() title = 'Please Confirm';
  @Input() message = 'Are you sure you want to perform this action?';
  @Input() confirmButtonText = 'Confirm';
  @Input() cancelButtonText = 'Cancel';

  constructor(@Inject(MAT_DIALOG_DATA) public data: ConfirmationModalData ,
              private readonly dialog:  MatDialogRef<ConfirmationModalComponent>) {}



  close(state  =false ){
    this.dialog.close(state)
  }
}
