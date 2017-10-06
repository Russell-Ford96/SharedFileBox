import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {LocationStrategy, HashLocationStrategy, PathLocationStrategy} from '@angular/common';

import { AppComponent } from './app.component';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { NAV_DROPDOWN_DIRECTIVES } from './shared/nav-dropdown.directive';

import { ChartsModule } from 'ng2-charts/ng2-charts';
import { SIDEBAR_TOGGLE_DIRECTIVES } from './shared/sidebar.directive';
import { AsideToggleDirective } from './shared/aside.directive';
import { BreadcrumbsComponent } from './shared/breadcrumb.component';

// Routing Module


// Layouts
import { FullLayoutComponent } from './layouts/full-layout.component';
import { SimpleLayoutComponent } from './layouts/simple-layout.component';
import {AppRoutingModule} from "./app.routing.module";
import {AppService} from "./app.service";
import {HttpModule} from "@angular/http";
import {DashboardResolve} from "./dashboard/dashboard.resolve";
import {DashboardModule} from "./dashboard/dashboard.module";
import {LoginFormComponent} from "./login/login.component";
import {AuthService} from "./login/auth.service";
import {AuthGuard} from "./auth.guard";
import {LoginGuard} from "./login.guard";
import {FileUploadComponent} from "./file-upload/file-upload.component";
import {FileUploadResolve} from "./file-upload/file-upload.resolve";
import {FileSelectDirective} from "ng2-file-upload";
import {CallbackComponent} from "./callback/callback.component";
import {RouterModule, Routes} from "@angular/router";
import {PageNotfoundComponent} from "./page-notfound/page-notfound.component";


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
    CallbackComponent,
    PageNotfoundComponent

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
