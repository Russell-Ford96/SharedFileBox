import { NgModule } from '@angular/core';
import {Routes, RouterModule} from "@angular/router";
import { FileUploadComponent } from "./file-upload/file-upload.component";
import { RequestComponent } from "./request/request.component";
import { LoginFormComponent } from "./login/login.component";
import { RegisterFormComponent } from "./register/register.component";

import { FileUploadResolve } from "./file-upload/file-upload.resolve";

import { AuthGuard } from './auth.guard';

const APP_ROUTES: Routes=[
    {path: '', redirectTo: '/404', pathMatch: 'full'},
    {path: 'admin', component: RequestComponent, canActivate: [AuthGuard] },
    {path: 'upload/:id', component: FileUploadComponent, resolve: { docRequest: FileUploadResolve } },
    {path: '404', component: FileUploadComponent },
    { path: 'login', component: LoginFormComponent, canActivate: [AuthGuard] },
    { path: 'register', component: RegisterFormComponent, canActivate: [AuthGuard] },
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
