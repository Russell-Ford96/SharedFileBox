import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UtilsModule } from '../../../core/utils/utils.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MdCardModule, MdGridListModule, MdTabsModule } from '@angular/material';
import { ComponentsGridlistComponent } from './components-gridlist.component';

@NgModule({
  imports: [
    CommonModule,
    UtilsModule,
    FlexLayoutModule,
    MdCardModule,
    MdTabsModule,
    MdGridListModule
  ],
  declarations: [ComponentsGridlistComponent],
  exports: [ComponentsGridlistComponent]
})
export class ComponentsGridlistModule { }
