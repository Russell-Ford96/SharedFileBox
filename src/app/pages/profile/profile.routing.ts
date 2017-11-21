import { Routes } from '@angular/router';
import { ProfileComponent } from './profile.component';
import { ProfileResolve } from "./profile.resolve";


export const ProfileRoutes: Routes = [
  {
    path: 'pages/profile',
    component: ProfileComponent,
    resolve: ProfileResolve
  }
];
