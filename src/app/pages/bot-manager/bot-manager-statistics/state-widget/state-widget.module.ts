import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StateWidgetComponent } from './state-widget.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MdIconModule } from '@angular/material';
import { UtilsModule } from '../../../../core/utils/utils.module';

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    MdIconModule,
    UtilsModule
  ],
  declarations: [StateWidgetComponent],
  exports: [StateWidgetComponent]
})
export class StateWidgetModule { }
