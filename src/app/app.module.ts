import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { environment } from '../environments/environment';

import 'hammerjs';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PagesModule } from './pages/pages.module';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { reducers } from './reducers/index';
// import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { EffectsModule } from '@ngrx/effects';
import { AgmCoreModule } from '@agm/core';
import { RouteHandlerModule } from './core/route-handler/route-handler.module';
import { AppService } from './app.service';
import { LocationStrategy, PathLocationStrategy } from '@angular/common';
import { AuthService } from './auth/auth.service';
import { AuthGuard } from './auth/auth.guard';
import { LoginGuard } from './auth/login.guard';
import { FileUploadResolve } from './file-upload/file-upload.resolve';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { ProfileComponent } from './profile/profile.component';
import { FileSelectDirective } from 'ng2-file-upload';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,
    StoreModule.forRoot(reducers),
    // StoreRouterConnectingModule,
    !environment.production ? StoreDevtoolsModule.instrument({ maxAge: 50 }) : [],
    EffectsModule.forRoot([]),
    AgmCoreModule.forRoot({
      apiKey: environment.googleMapsApiKey
    }),
    AppRoutingModule,
    CoreModule,
    PagesModule,
    RouteHandlerModule

  ],
  providers: [{
    provide: LocationStrategy,
    useClass: PathLocationStrategy
  },
    AppService,
    AuthService,
    AuthGuard,
    LoginGuard,
    FileUploadResolve],

  declarations: [
    AppComponent,
    FileUploadComponent,
    ProfileComponent,
    FileSelectDirective


  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
