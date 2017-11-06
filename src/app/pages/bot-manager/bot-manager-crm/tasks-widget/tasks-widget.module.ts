import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { MdButtonModule, MdCheckboxModule, MdIconModule,
         MdMenuModule, MdSnackBarModule, MdTooltipModule } from '@angular/material';
import { TasksWidgetComponent } from './tasks-widget.component';

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
    MdSnackBarModule
  ],
  declarations: [TasksWidgetComponent],
  exports: [TasksWidgetComponent]
})
export class TasksWidgetModule { }
