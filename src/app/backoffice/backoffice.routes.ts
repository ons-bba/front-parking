// src/app/backoffice/backoffice.routes.ts
import { Routes } from '@angular/router';
import {DashboardComponent} from './dashboard/dashboard.component';
import {CreateUserComponent} from './user-module/create-user/create-user.component';
import {UsersListComponent} from './user-module/users-list/users-list.component';
import {UserDetailsComponent} from './user-module/user-details/user-details.component';
import {UserDashboardComponent} from './user-module/user-dashboard/user-dashboard.component';

export const backofficeRoutes: Routes = [
    { path :"users" ,component : UserDashboardComponent},
    { path :"users/dashboard" ,component :  UserDashboardComponent },

  // { path :"users/create" ,component : CreateUserComponent },
   { path :"users/list" ,component : UsersListComponent },
   { path :"users/details/:id" ,component : UserDetailsComponent },
];
