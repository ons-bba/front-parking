// src/app/guards/auth.guard.ts
import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from '@angular/router';
import {AuthService, Role} from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const user = this.auth.getUser();
    const expectedRoles: Role[] = route.data['roles'];

    if (!this.auth.isAuthenticated()) {
      this.router.navigate(['/login']);
      return false;
    }

    if (expectedRoles && (!user || !expectedRoles.includes(user.role))) {
      // Redirect if role is not authorized
      if (user?.role === Role.ADMIN) {
        this.router.navigate(['/backoffice']);
      } else {
        this.router.navigate(['/front-office']);
      }
      return false;
    }

    return true;
  }
}
