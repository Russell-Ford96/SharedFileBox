import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent } from './icon.component';
import { MdIconModule, MdInputModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { UtilsModule } from '../../core/utils/utils.module';

@NgModule({
  imports: [
    CommonModule,
    MdIconModule,
    UtilsModule,
    FlexLayoutModule,
    MdInputModule
  ],
  declarations: [IconComponent]
})
export class IconModule { }
