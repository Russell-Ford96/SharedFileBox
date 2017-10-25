import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecentsalesWidgetComponent } from './recentsales-widget.component';
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
  declarations: [RecentsalesWidgetComponent],
  exports: [RecentsalesWidgetComponent]
})
export class RecentsalesWidgetModule { }
