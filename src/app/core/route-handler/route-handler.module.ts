import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouteHandlerComponent } from './route-handler.component';
import { RouterModule } from '@angular/router';
import {Store} from "@ngrx/store";

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  providers: [
    Store
  ],
  declarations: [RouteHandlerComponent],
  exports: [RouteHandlerComponent]
})
export class RouteHandlerModule { }
