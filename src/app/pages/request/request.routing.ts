import { Routes } from '@angular/router';
import {RequestComponent} from './request.component';
import {RequestDetailComponent} from './request-detail/request-detail.component';

export const requestRoutes: Routes = [
  {
    path: 'request',
    component: RequestComponent,

  },
  {
    path: 'request/detail/:refnumb',
    component: RequestDetailComponent

  }


]



