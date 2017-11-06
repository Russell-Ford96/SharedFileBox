import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MdButtonModule, MdCheckboxModule, MdIconModule,
  MdMenuModule, MdSnackBarModule, MdTooltipModule
} from '@angular/material';
import { UtilsModule } from '../../../core/utils/utils.module';
import { ComponentsAddItemBotComponent } from './components-add-item-bot.component';
import { DragulaModule } from 'ng2-dragula/ng2-dragula';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    UtilsModule,
    FlexLayoutModule,
    MdMenuModule,
    MdIconModule,
    MdCheckboxModule,
    MdTooltipModule,
    MdButtonModule,
    MdSnackBarModule,
    DragulaModule

  ],
  declarations: [ComponentsAddItemBotComponent],
  exports: [ComponentsAddItemBotComponent]
})
export class ComponentsAddItemBotModule { }
