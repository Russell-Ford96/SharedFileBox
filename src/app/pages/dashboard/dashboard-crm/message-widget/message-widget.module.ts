import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessageWidgetComponent } from './message-widget.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
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
  declarations: [MessageWidgetComponent],
  exports: [MessageWidgetComponent]
})
export class MessageWidgetModule { }
