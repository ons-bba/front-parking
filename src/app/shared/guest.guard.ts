import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GuestGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate(): Observable<boolean> {
    if (this.auth.isAuthenticated()) {
      return this.auth.currentUser$.pipe(
        map(user => {
          if (user?.role === 'ADMIN') {
            this.router.navigate(['/backoffice']);
          } else {
            this.router.navigate(['/front-office']);
          }
          return false;
        })
      );
    }
    return of(true);
  }
}
