import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsCardComponent } from './components-card.component';
import { UtilsModule } from '../../../core/utils/utils.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MdButtonModule, MdCardModule, MdIconModule, MdTabsModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    UtilsModule,
    FlexLayoutModule,
    MdCardModule,
    MdTabsModule,
    MdButtonModule,
    MdIconModule
  ],
  declarations: [ComponentsCardComponent],
  exports: [ComponentsCardComponent]
})
export class ComponentsCardModule { }
