import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { environment } from '../environments/environment';
// import { TimeAgoPipe } from "time-ago-pipe";

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
import { AppSocketService } from './app.socket.service';
import { LocationStrategy, PathLocationStrategy } from '@angular/common';
import { AuthService } from './auth/auth.service';
import { AuthGuard } from './auth/auth.guard';
import { LoginGuard } from './auth/login.guard';
import { FileUploadResolve } from './file-upload/file-upload.resolve';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { ProfileComponent } from './profile/profile.component';
import { FileUploadModule } from 'ng2-file-upload';
import { RouterModule } from '@angular/router';
import { LoadingModule, ANIMATION_TYPES } from 'ngx-loading';
import { Angular2FlexModule } from "angular2-flex";
import { AutobotModule } from './autobot/autobot.module';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,
    FileUploadModule,
    LoadingModule.forRoot({
        animationType: ANIMATION_TYPES.rectangleBounce,
        backdropBackgroundColour: 'rgba(0,0,0,0.1)',
        backdropBorderRadius: '4px',
        primaryColour: '#ffffff',
        secondaryColour: '#ffffff',
        tertiaryColour: '#ffffff'
    }),
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
    RouteHandlerModule,
    Angular2FlexModule,
    AutobotModule
  ],


  providers: [
    AppService,{
      provide: LocationStrategy,
      useClass: PathLocationStrategy
  },
    AppService,
    AppSocketService,
    AuthService,
    AuthGuard,
    LoginGuard,
    FileUploadResolve
  ],

  declarations: [
    AppComponent,
    FileUploadComponent,
    ProfileComponent,
    // TimeAgoPipe,
  ],


  bootstrap: [AppComponent]
})

export class AppModule { }
