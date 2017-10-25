import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragAndDropComponent } from './drag-and-drop.component';
import { SortablejsModule } from 'angular-sortablejs';
import { MdIconModule, MdListModule, MdToolbarModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  imports: [
    CommonModule,
    SortablejsModule,
    MdIconModule,
    FlexLayoutModule,
    MdToolbarModule,
    MdListModule
  ],
  declarations: [DragAndDropComponent]
})
export class DragAndDropModule { }
