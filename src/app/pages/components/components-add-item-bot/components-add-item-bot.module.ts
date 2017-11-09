import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatButtonModule, MatCheckboxModule, MatIconModule,
  MatMenuModule, MatSnackBarModule, MatTooltipModule
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
    MatMenuModule,
    MatIconModule,
    MatCheckboxModule,
    MatTooltipModule,
    MatButtonModule,
    MatSnackBarModule,
    DragulaModule

  ],
  declarations: [ComponentsAddItemBotComponent],
  exports: [ComponentsAddItemBotComponent]
})
export class ComponentsAddItemBotModule { }
