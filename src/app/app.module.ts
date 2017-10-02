import { LocationStrategy, HashLocationStrategy } from '@angular/common';

import { DropdownModule } from 'ng2-dropdown';
import { ChartsModule } from 'ng2-charts/ng2-charts';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { TabsModule } from 'ng2-tabs';


import { AppComponent } from './app.component';
import { AdminComponent } from "./admin/admin.component";
import { RequestFormComponent } from './request-form/request-form.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AppService } from './app.service';
import { LoginFormComponent } from "./login/login.component";
import { RegisterFormComponent } from "./register/register.component";
import { FileUploadComponent } from "./file-upload/file-upload.component";
import {LeftsidenavComponent} from "./leftsidenav/leftsidenav.component";

import { FileUploadResolve } from "./file-upload/file-upload.resolve";
import{ AdminResolve} from "./admin/admin.resolve";

import {FileSelectDirective, FileDropDirective} from 'ng2-file-upload';

import {AppRoutingModule} from "./app-routing.module";

import { AuthService } from "./login/auth.service";
import { AuthGuard } from './auth.guard';


@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    RequestFormComponent,
    NavbarComponent,
    FileUploadComponent,
      FileSelectDirective,
      LoginFormComponent,
      RegisterFormComponent,
      LeftsidenavComponent,



  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    TabsModule,
    BrowserModule,
    AppRoutingModule,
    DropdownModule,
    TabsModule,
    ChartsModule



  ],


    providers: [
        AppService,
        AuthGuard,
        AuthService,
        FileUploadResolve,
        AdminResolve,

    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
