import { Routes } from '@angular/router';
import {backofficeRoutes} from './backoffice/backoffice.routes';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadComponent: () => import('../app/login/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'register',
    loadComponent: () => import('../app/register/register.component').then(m => m.RegisterComponent)
  },
  {
    path: 'backoffice',
    loadComponent: () => import('../app/backoffice/backoffice-layout.component').then(m => m.BackofficeLayoutComponent),
    children :backofficeRoutes
  },
  {
    path: '**',
    loadComponent: () => import('../app/notfound/notfound.component').then(m => m.NotfoundComponent)
  },




];
