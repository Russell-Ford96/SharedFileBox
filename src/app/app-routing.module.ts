import { NgModule } from '@angular/core';
import {Routes, RouterModule} from "@angular/router";
import { FileUploadComponent } from "./file-upload.component";
import { RequestComponent } from "./request.component";

const APP_ROUTES: Routes=[
  {path: '', redirectTo: '/messenger', pathMatch: 'full'},
  {path: 'messenger', component: RequestComponent },
  {path: 'upload', component: FileUploadComponent },
  {path: '*', component: RequestComponent }
    
];

@NgModule({
  imports: [ RouterModule.forRoot(APP_ROUTES)],
  exports:[ RouterModule ]
})

export class AppRoutingModule { }
