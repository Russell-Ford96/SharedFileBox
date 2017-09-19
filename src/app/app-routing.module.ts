import { NgModule } from '@angular/core';
import {Routes, RouterModule} from "@angular/router";
import {FileUploadComponent} from "./file-upload.component";
import { RequestComponent } from "./request.component";
import {AppComponent} from "./app.component";

const APP_ROUTES: Routes=[
  {path: '', redirectTo: '/index', pathMatch: 'full'},
  {path: 'index', component: RequestComponent},
  {path: 'upload', component: FileUploadComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(APP_ROUTES)],
  exports:[RouterModule]
})

export class AppRoutingModule {

}
