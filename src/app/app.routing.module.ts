import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Layouts
import { FullLayoutComponent } from './layouts/full-layout.component';
import { SimpleLayoutComponent } from './layouts/simple-layout.component';
import {DashboardComponent} from "./dashboard/dashboard.component";
import {DashboardResolve} from "./dashboard/dashboard.resolve";
import {AuthGuard} from "./auth.guard";
import {LoginGuard} from "./login.guard";
import {LoginFormComponent} from "./login/login.component";
import {FileUploadComponent} from "./file-upload/file-upload.component";
import {FileUploadResolve} from "./file-upload/file-upload.resolve";
import {CallbackComponent} from "./callback/callback.component";
import {PageNotfoundComponent} from "./page-notfound/page-notfound.component";

export const routes: Routes = [

  {
    path: 'login',
    component: LoginFormComponent,
    canActivate: [LoginGuard]
  },
  {
    path: 'upload/:id',
    component: FileUploadComponent
  },
  {
    path: 'callback',
    component: CallbackComponent
  },
  {
    path: '404',
    component: PageNotfoundComponent
  },

  {
    path: '',
    component: FullLayoutComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'Home'
    },
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
        loadChildren: './dashboard/dashboard.module#DashboardModule',
        resolve: {docRequests: DashboardResolve}
      },
      {
        path: 'message',
        loadChildren: './Message/Message.module#MessageModule'
      },
     /* {
        path:'upload/:id',
        component: FileUploadComponent,
        resolve: { docRequest: FileUploadResolve }
      }*/

    ]
  },


];

@NgModule({
  imports: [ RouterModule.forRoot(routes, { useHash: false }) ],
  exports: [ RouterModule ],
  providers: [
    FileUploadResolve
  ]
})
export class AppRoutingModule {}
