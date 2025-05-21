// src/app/guards/guest.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import {AuthService} from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class GuestGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.auth.isAuthenticated()) {
      const user = this.auth.getUser();
      if (user?.role === 'ADMIN') {
        this.router.navigate(['/backoffice']);
      } else {
        this.router.navigate(['/front-office']);
      }
      return false;
    }
    return true;
  }
}
