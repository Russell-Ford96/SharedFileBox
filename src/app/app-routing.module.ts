import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './core/layout/layout.component';
import {LoginGuard} from './auth/login.guard';
import {FileUploadComponent} from './file-upload/file-upload.component';
import {FileUploadResolve} from './file-upload/file-upload.resolve';
import {AuthGuard} from './auth/auth.guard';
import {dashboardRoutes} from './pages/dashboard/dashboard.routing';
import {componentsRoutes} from './pages/components/components.routing';
import {formRoutes} from './pages/forms/forms.routing';
import {inboxRoutes} from './pages/inbox/inbox.routing';
import {profileRoutes} from './pages/profile/profile.routing';
import {tablesRoutes} from './pages/tables/tables.routing';
import {editorRoutes} from './pages/editor/editor.routing';
import {dragAndDropRoutes} from './pages/drag-and-drop/drag-and-drop.routing';
import {iconRoutes} from './pages/icon/icon.routing';
import {mapsRoutes} from './pages/google-maps/google-maps.routing';
import {projectsRoutes} from './pages/projects/projects.routing';
import {projectDetailsRoutes} from './pages/project-details/project-details.routing';
import {requestRoutes} from './pages/request/request.routing';
import {RequestDetailComponent} from './pages/request/request-detail/request-detail.component';
import {LoginComponent} from './pages/auth/login/login.component';
import {mailRoutes} from "./pages/mail/mail.routing";
// import {chatRoutes} from "./pages/chat/chat.routing";

const routes: Routes = [

  {
    path:'auth/login',
    component: LoginComponent,
    canActivate: [LoginGuard]

  },
  {
    path: 'upload/:id',
    component: FileUploadComponent,
    resolve: { docRequest: FileUploadResolve }
  },

  {
    path: '',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    children: [
      ...requestRoutes,
      ...dashboardRoutes,
      ...componentsRoutes,
      ...formRoutes,
      ...mailRoutes,
      ...chatRoutes,
      ...inboxRoutes,
      ...ProfileRoutes,
      ...tablesRoutes,
      ...editorRoutes,
      ...dragAndDropRoutes,
      ...iconRoutes,
      ...mapsRoutes,
      ...projectsRoutes,
      ...projectDetailsRoutes,


    ]
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes,{ useHash: false })],
  exports: [RouterModule],
  providers: [
    FileUploadResolve
  ]
})
export class AppRoutingModule { }
