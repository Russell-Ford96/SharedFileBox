import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TourComponent } from './tour.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [TourComponent],
  exports: [TourComponent]
})
export class TourModule { }
