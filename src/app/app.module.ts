//@angular
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {LocationStrategy, HashLocationStrategy, PathLocationStrategy} from '@angular/common';
import {HttpModule} from "@angular/http";
import {RouterModule, Routes} from "@angular/router";

//bootstrap
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { NAV_DROPDOWN_DIRECTIVES } from './shared/nav-dropdown.directive';

//ng2 charts
import { ChartsModule } from 'ng2-charts/ng2-charts';

//admin template
import { SIDEBAR_TOGGLE_DIRECTIVES } from './shared/sidebar.directive';
import { AsideToggleDirective } from './shared/aside.directive';
import { BreadcrumbsComponent } from './shared/breadcrumb.component';
import { FullLayoutComponent } from './layouts/full-layout.component';
import { SimpleLayoutComponent } from './layouts/simple-layout.component';
import {DashboardResolve} from "./dashboard/dashboard.resolve";
import {DashboardModule} from "./dashboard/dashboard.module";


import { AppComponent } from './app.component';
import {AppRoutingModule} from "./app.routing.module";
import {AppService} from "./app.service";
import {LoginFormComponent} from "./login/login.component";
//Auth
import {AuthService} from "./auth/auth.service";
import {AuthGuard} from "./auth/auth.guard";
import {LoginGuard} from "./auth/login.guard";
import {FileUploadComponent} from "./file-upload/file-upload.component";
import {FileUploadResolve} from "./file-upload/file-upload.resolve";
import {FileSelectDirective} from "ng2-file-upload";
import {PageNotFoundComponent} from "./page-notfound/page-notfound.component";


const routes: Routes = [

];

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
    ChartsModule,
    HttpModule,
    DashboardModule,
    RouterModule.forRoot(routes, { useHash: false })
  ],
  declarations: [
    AppComponent,
    FullLayoutComponent,
    SimpleLayoutComponent,
    NAV_DROPDOWN_DIRECTIVES,
    BreadcrumbsComponent,
    SIDEBAR_TOGGLE_DIRECTIVES,
    AsideToggleDirective,
    LoginFormComponent,
    FileUploadComponent,
    FileSelectDirective,
    PageNotFoundComponent

  ],
  providers: [{
    provide: LocationStrategy,
    useClass: PathLocationStrategy
  },
    AppService,
    DashboardResolve,
    AuthService,
    AuthGuard,
    LoginGuard,
    FileUploadResolve],

  bootstrap: [ AppComponent ]
})
export class AppModule { }
