import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { RequestComponent } from "./request/request.component";
import { RequestFormComponent } from './request-form/request-form.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AppService } from './app.service';
import { FileUploadComponent } from "./file-upload/file-upload.component";
import { FileUploadResolve } from "./file-upload/file-upload.resolve";

import {FileSelectDirective, FileDropDirective} from 'ng2-file-upload';
import {AppRoutingModule} from "./app-routing.module";


@NgModule({
  declarations: [
    AppComponent,
    RequestComponent,
    RequestFormComponent,
    NavbarComponent,
    FileUploadComponent,
    FileSelectDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    AppRoutingModule
  ],
    providers: [
        AppService,
        FileUploadResolve
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
