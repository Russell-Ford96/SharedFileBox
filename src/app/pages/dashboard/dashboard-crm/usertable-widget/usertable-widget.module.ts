import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsertableWidgetComponent } from './usertable-widget.component';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import {
  MdButtonModule, MdCheckboxModule, MdIconModule, MdMenuModule, MdPaginatorModule, MdProgressSpinnerModule, MdSortModule, MdTableModule,
  MdTooltipModule
} from '@angular/material';
import { CdkTableModule } from '@angular/cdk/table';

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
    MdTableModule,
    CdkTableModule,
    MdPaginatorModule,
    MdSortModule,
    MdProgressSpinnerModule
  ],
  declarations: [UsertableWidgetComponent],
  exports: [UsertableWidgetComponent]
})
export class UsertableWidgetModule { }
