import { Injectable } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {ConfirmationModalComponent, ConfirmationModalData} from './confirmation-modal/confirmation-modal.component';
import {Observable} from 'rxjs';
import {AlertComponent, AlertData} from './alertComponent/AlertComponent.component';

@Injectable({ providedIn: 'root' })
export class ModalService {
  constructor(private readonly dialog: MatDialog) {}

  confirm(data?: ConfirmationModalData): Observable<boolean> {
    const dialogRef = this.dialog.open(ConfirmationModalComponent, {
      data,
      width: '600',
      disableClose: true
    });

    return dialogRef.afterClosed();
  }
   closeAll(){
    this.dialog.closeAll() ;
  }
  showAlert(message: string, type: 'success' | 'error'): void {
    this.dialog.open(AlertComponent, {
      data: { message, type } as AlertData,
      width: '400px',
      disableClose: false
    });
  }

}
