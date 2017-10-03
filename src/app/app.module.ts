import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { RequestComponent } from "./request/request.component";
import { RequestFormComponent } from './request-form/request-form.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AppService } from './app.service';
import { LoginFormComponent } from "./login/login.component";
import { RegisterFormComponent } from "./register/register.component";

import { FileUploadComponent } from "./file-upload/file-upload.component";
import { FileUploadResolve } from "./file-upload/file-upload.resolve";
import{ RequestResolve} from "./request/request.resolve";

import {FileSelectDirective, FileDropDirective} from 'ng2-file-upload';
import {AppRoutingModule} from "./app-routing.module";

import { AuthService } from "./login/auth.service";
import { AuthGuard } from './auth.guard';
import { MomentModule } from 'angular2-moment';

@NgModule({
  declarations: [
    AppComponent,
    RequestComponent,
    RequestFormComponent,
    NavbarComponent,
    FileUploadComponent,
      FileSelectDirective,
      LoginFormComponent,
      RegisterFormComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    AppRoutingModule,
    MomentModule
  ],
    providers: [
        AppService,
        AuthGuard,
        AuthService,
        FileUploadResolve,
        RequestResolve
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
