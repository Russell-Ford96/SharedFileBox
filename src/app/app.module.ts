import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DropdownModule } from 'ng2-dropdown';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { TabsModule } from 'ng2-tabs';
import {FileSelectDirective, FileDropDirective} from 'ng2-file-upload';


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

import {AppRoutingModule} from "./app-routing.module";

import { AuthService } from "./login/auth.service";
import { AuthGuard } from './auth.guard';

import { CallbackComponent } from './callback/callback.component';
import { ProfileComponent } from './profile/profile.component';

import { MomentModule } from 'angular2-moment';

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
      CallbackComponent,
      ProfileComponent
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
      ChartsModule,
      NgbModule.forRoot(),
    MomentModule
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
