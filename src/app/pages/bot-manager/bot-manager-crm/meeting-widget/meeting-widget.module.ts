import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MeetingWidgetComponent } from './meeting-widget.component';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import {
  MdButtonModule, MdCheckboxModule, MdIconModule, MdListModule, MdMenuModule, MdRippleModule,
  MdTooltipModule
} from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    FlexLayoutModule,
    MdMenuModule,
    MdIconModule,
    MdCheckboxModule,
    MdTooltipModule,
    MdButtonModule,
    MdListModule,
    MdRippleModule
  ],
  declarations: [MeetingWidgetComponent],
  exports: [MeetingWidgetComponent]
})
export class MeetingWidgetModule { }
