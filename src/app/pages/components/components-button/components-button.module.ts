import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MdButtonModule, MdButtonToggleModule, MdCardModule, MdIconModule, MdTabsModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ComponentsButtonComponent } from './components-button.component';
import { UtilsModule } from '../../../core/utils/utils.module';

@NgModule({
  imports: [
    CommonModule,
    UtilsModule,
    FlexLayoutModule,
    MdCardModule,
    MdTabsModule,
    MdButtonModule,
    MdButtonToggleModule,
    MdIconModule,
  ],
  declarations: [ComponentsButtonComponent],
  exports: [ComponentsButtonComponent]
})
export class ComponentsButtonModule { }
