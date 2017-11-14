import { Routes } from '@angular/router';
import { ProfileComponent } from './profile.component';
import { BotsCreationComponent } from "./bots-creation/bots-creation.component";

export const profileRoutes: Routes = [
  {
    path: 'pages/profile',
    component: ProfileComponent
  }
];
