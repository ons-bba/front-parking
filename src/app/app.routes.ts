import { Routes } from '@angular/router';
import {backofficeRoutes} from './backoffice/backoffice.routes';
import {VerifyAccountComponent} from './register/verify-account/verify-account.component';
import {GuestGuard} from './shared/guest.guard';
import {Role} from './services/auth.service';
import {AuthGuard} from './shared/auth-guard';
import {ForgotPasswordComponent} from './shared/components/forgot-password/forgot-password.component';
import {ResetPasswordComponent} from './shared/components/reset-password/reset-password.component';
import {frontofficeRoutes} from './frontoffice/frontoffice.routes';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadComponent: () => import('../app/login/login.component').then(m => m.LoginComponent),
    canActivate: [GuestGuard],

  },
  {
    path: 'register',
    loadComponent: () => import('../app/register/register.component').then(m => m.RegisterComponent),
    canActivate: [GuestGuard],

  },
  {
    path: 'backoffice',
    loadComponent: () => import('../app/backoffice/backoffice-layout.component').then(m => m.BackofficeLayoutComponent),
    canActivate: [AuthGuard],
    data: { roles: [Role.ADMIN] },
    children :backofficeRoutes
  },
  {
    path: 'front-office',
    loadComponent: () => import('../app/frontoffice/frontoffice.component').then(m => m.FrontofficeComponent),
    canActivate: [AuthGuard],
    data: { roles: [Role.OPERATEUR , Role.CONDUCTEUR] },
    children :frontofficeRoutes
  },
   {path : "users/verifyaccount/:token" ,component : VerifyAccountComponent},
  { path: 'forget-password', component: ForgotPasswordComponent },
  { path: 'reset-password', component: ResetPasswordComponent },
  {path : 'search',component:SearchParkingComponent},
  {
    path: '**',
    loadComponent: () => import('./shared/components/notfound/notfound.component').then(m => m.NotfoundComponent)
  },




];
