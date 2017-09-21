import { NgModule } from '@angular/core';
import {Routes, RouterModule} from "@angular/router";
import { FileUploadComponent } from "./file-upload/file-upload.component";
import { RequestComponent } from "./request/request.component";

import { FileUploadResolve } from "./file-upload/file-upload.resolve";

const APP_ROUTES: Routes=[
    {path: '', redirectTo: '/404', pathMatch: 'full'},
    {path: 'admin', component: RequestComponent },
    {path: 'upload/:id', component: FileUploadComponent, resolve: { docRequest: FileUploadResolve } },
    {path: '404', component: FileUploadComponent },
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
