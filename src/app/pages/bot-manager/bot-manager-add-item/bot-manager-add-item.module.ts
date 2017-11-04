import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as fromRoot from '../../../reducers/index';
import { Store } from '@ngrx/store';
import { PageHeaderModule } from '../../../core/page-header/page-header.module';
import { BotManagerAddItemComponent } from './bot-manager-add-item.component';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  imports: [
    CommonModule,
    PageHeaderModule,
    FlexLayoutModule
  ],
  declarations: [
    BotManagerAddItemComponent
  ],
  exports: [
    BotManagerAddItemComponent
  ]
})
export class BotManagerAddItemModule { }
