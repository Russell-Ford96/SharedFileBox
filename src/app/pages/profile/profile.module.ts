import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import {
  MdButtonModule, MdCheckboxModule, MdDatepickerModule, MdIconModule, MdInputModule, MdNativeDateModule, MdRadioModule, MdSelectModule, MdSliderModule, MdSlideToggleModule, MdTabsModule,
  MdTooltipModule, MdChipsModule, MdGridListModule
} from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BotsOverviewComponent } from './bots-overview/bots-overview.component';
import { BreadcrumbsModule } from '../../core/breadcrumbs/breadcrumbs.module';
import { PageHeaderModule } from '../../core/page-header/page-header.module';
import { BotsCreationComponent } from "./bots-creation/bots-creation.component";
import { ComponentsAddItemBotModule } from '../components/components-add-item-bot/components-add-item-bot.module';

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    PageHeaderModule,
    MdButtonModule, MdCheckboxModule, MdDatepickerModule, MdIconModule, MdInputModule, MdNativeDateModule, MdRadioModule, MdSelectModule, MdSliderModule, MdSlideToggleModule, MdTabsModule,
    MdTooltipModule, MdChipsModule,MdGridListModule,
    FormsModule,
    ReactiveFormsModule,
    BreadcrumbsModule,
    ComponentsAddItemBotModule
  ],
  declarations: [
    ProfileComponent,
    BotsOverviewComponent,
    BotsCreationComponent]
})
export class ProfileModule { }
