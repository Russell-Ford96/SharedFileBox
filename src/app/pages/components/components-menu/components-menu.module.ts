import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsMenuComponent } from './components-menu.component';
import { UtilsModule } from '../../../core/utils/utils.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MdButtonModule, MdCardModule, MdIconModule, MdMenuModule, MdTabsModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    UtilsModule,
    FlexLayoutModule,
    MdCardModule,
    MdTabsModule,
    MdMenuModule,
    MdIconModule,
    MdButtonModule
  ],
  declarations: [ComponentsMenuComponent],
  exports: [ComponentsMenuComponent]
})
export class ComponentsMenuModule { }
