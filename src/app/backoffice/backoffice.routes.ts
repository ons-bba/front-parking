// src/app/backoffice/backoffice.routes.ts
import { Routes } from '@angular/router';
import {DashboardComponent} from './dashboard/dashboard.component';
import {CreateUserComponent} from './user-module/create-user/create-user.component';
import {UsersListComponent} from './user-module/users-list/users-list.component';

export const backofficeRoutes: Routes = [
   { path :"dashboard" ,component : DashboardComponent },
    { path :"users" ,component : CreateUserComponent },
    { path :"users/create" ,component : CreateUserComponent },
   { path :"users/list" ,component : UsersListComponent },
];
