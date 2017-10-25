import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsDialogComponent, ComponentsDialogDemoDialogComponent } from './components-dialog.component';
import { UtilsModule } from '../../../core/utils/utils.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MdButtonModule, MdCardModule, MdDialogModule, MdTabsModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    UtilsModule,
    FlexLayoutModule,
    MdCardModule,
    MdTabsModule,
    MdDialogModule,
    MdButtonModule
  ],
  entryComponents: [ComponentsDialogDemoDialogComponent],
  declarations: [ComponentsDialogComponent, ComponentsDialogDemoDialogComponent],
  exports: [ComponentsDialogComponent]
})
export class ComponentsDialogModule { }

