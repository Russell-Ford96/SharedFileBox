import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AreachartWidgetComponent } from './areachart-widget.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MdButtonModule, MdIconModule, MdMenuModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    MdIconModule,
    MdMenuModule,
    MdButtonModule
  ],
  declarations: [AreachartWidgetComponent],
  exports: [AreachartWidgetComponent]
})
export class AreachartWidgetModule { }
