import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SalesWidgetComponent } from './sales-widget.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MdButtonModule, MdIconModule, MdMenuModule } from '@angular/material';
import { UtilsModule } from 'app/core/utils/utils.module';

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    MdIconModule,
    MdMenuModule,
    MdButtonModule,
    UtilsModule
  ],
  declarations: [SalesWidgetComponent],
  exports: [SalesWidgetComponent]
})
export class SalesWidgetModule { }
