import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsTooltipComponent } from './components-tooltip.component';
import { MdButtonModule, MdCardModule, MdIconModule, MdTabsModule, MdTooltipModule } from '@angular/material';
import { UtilsModule } from '../../../core/utils/utils.module';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  imports: [
    CommonModule,
    UtilsModule,
    FlexLayoutModule,
    MdCardModule,
    MdTabsModule,
    MdTooltipModule,
    MdIconModule,
    MdButtonModule
  ],
  declarations: [ComponentsTooltipComponent],
  exports: [ComponentsTooltipComponent]
})
export class ComponentsTooltipModule { }
