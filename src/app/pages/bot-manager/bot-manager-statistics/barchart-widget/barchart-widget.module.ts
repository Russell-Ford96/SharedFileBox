import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BarchartWidgetComponent } from './barchart-widget.component';
import { MdButtonModule, MdIconModule, MdMenuModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    MdIconModule,
    MdMenuModule,
    MdButtonModule
  ],
  declarations: [BarchartWidgetComponent],
  exports: [BarchartWidgetComponent]
})
export class BarchartWidgetModule { }
