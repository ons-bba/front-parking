import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { AuthService, Role } from '../services/auth.service';
import { User } from './interfaces/interfaces.general';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    const expectedRoles: Role[] = route.data['roles'];

    // First check authentication status
    if (!this.auth.isAuthenticated()) {
      this.router.navigate(['/login']);
      return new Observable<boolean>(observer => observer.next(false));
    }

    // Then check user roles reactively
    return this.auth.currentUser$.pipe(
      take(1), // Only take the first emission
      map((user: User | null) => {
        if (!user) {
          this.router.navigate(['/login']);
          return false;
        }

        // If no specific roles required, allow access
        if (!expectedRoles || expectedRoles.length === 0) {
          return true;
        }

        // Check if user has required role
        if (expectedRoles.includes(user.role)) {
          return true;
        }

        // Redirect based on user role
        if (user.role === Role.ADMIN) {
          this.router.navigate(['/backoffice']);
        } else {
          this.router.navigate(['/front-office']);
        }

        return false;
      })
    );
  }
}
