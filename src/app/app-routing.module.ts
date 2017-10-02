import { NgModule } from '@angular/core';
import {Routes, RouterModule} from "@angular/router";
import { FileUploadComponent } from "./file-upload/file-upload.component";
import { AdminComponent } from "./admin/admin.component";
import { LoginFormComponent } from "./login/login.component";
import { RegisterFormComponent } from "./register/register.component";

import { FileUploadResolve } from "./file-upload/file-upload.resolve";
import {AdminResolve} from "./admin/admin.resolve";

import { AuthGuard } from './auth.guard';
import {LeftsidenavComponent} from "./leftsidenav/leftsidenav.component";
import {NavbarComponent} from "./navbar/navbar.component";


const APP_ROUTES: Routes=[
    {path: '', redirectTo: '/login', pathMatch: 'full'},
    {path: 'admin', component: AdminComponent, canActivate: [AuthGuard], resolve:   { docRequests: AdminResolve} },
    {path: 'upload/:id', component: FileUploadComponent, resolve: { docRequest: FileUploadResolve } },
    {path: '404', component: FileUploadComponent },
    {path: 'login', component: LoginFormComponent, canActivate: [AuthGuard] },
    {path: 'register', component: RegisterFormComponent, canActivate: [AuthGuard] },
    {path: 'navbar', component: NavbarComponent, canActivate: [AuthGuard] },
    {path: '*', redirectTo: '/404', pathMatch: 'full'}

];

@NgModule({
  imports: [ RouterModule.forRoot(APP_ROUTES)],
    exports:[ RouterModule ],
    providers: [
        FileUploadResolve
    ]
})

export class AppRoutingModule { }
