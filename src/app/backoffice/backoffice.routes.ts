// src/app/backoffice/backoffice.routes.ts
import { Routes } from '@angular/router';
import {DashboardComponent} from './dashboard/dashboard.component';
import {CreateUserComponent} from './user-module/create-user/create-user.component';
import {UsersListComponent} from './user-module/users-list/users-list.component';
import {UserDetailsComponent} from './user-module/user-details/user-details.component';
import {UserDashboardComponent} from './user-module/user-dashboard/user-dashboard.component';

import { ParkingManagementComponent } from './parking-module/parking-management/parking-management.component';
import { ParkingFormComponent } from './parking-module/parking-form/parking-form.component';
import { ParkingListComponent } from './parking-module/parking-list/parking-list.component';
import { PlaceformComponent } from './parking-module/placeform/placeform.component';
import { PlacesParkingComponent } from './parking-module/places-parking/places-parking.component';


export const backofficeRoutes: Routes = [
    { path :"users" ,component : UserDashboardComponent},
    { path :"users/dashboard" ,component :  UserDashboardComponent },

  // { path :"users/create" ,component : CreateUserComponent },
   { path :"users/list" ,component : UsersListComponent },
   { path :"users/details/:id" ,component : UserDetailsComponent },
   {path:"parking/list",component:ParkingListComponent},
   {path:"parking/edit/:id", component:ParkingFormComponent},
   {path:'parking/place',component:PlacesParkingComponent},
   {path:'parking/place/form',component:PlaceformComponent},
   {path:'management', component:ParkingManagementComponent}
];
