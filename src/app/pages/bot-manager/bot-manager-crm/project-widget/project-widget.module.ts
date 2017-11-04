import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectWidgetComponent } from './project-widget.component';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import {
  MdButtonModule, MdCheckboxModule, MdIconModule, MdMenuModule, MdRippleModule, MdSnackBarModule,
  MdTooltipModule
} from '@angular/material';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    FlexLayoutModule,
    MdMenuModule,
    MdIconModule,
    MdCheckboxModule,
    MdTooltipModule,
    MdButtonModule,
    MdSnackBarModule,
    MdRippleModule
  ],
  declarations: [ProjectWidgetComponent],
  exports: [ProjectWidgetComponent]
})
export class ProjectWidgetModule { }
