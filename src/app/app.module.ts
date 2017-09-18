import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { RequestFormComponent } from './request-form.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AppService } from './app.service';

@NgModule({
  declarations: [
    AppComponent,
      RequestFormComponent,
      NavbarComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule
  ],
    providers: [
        AppService
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
