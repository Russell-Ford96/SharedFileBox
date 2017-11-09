import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import {
  MatButtonModule, MatCheckboxModule, MatDatepickerModule, MatIconModule, MatInputModule, MatNativeDateModule, MatRadioModule, MatSelectModule, MatSliderModule, MatSlideToggleModule, MatTabsModule,
  MatTooltipModule, MatChipsModule, MatGridListModule
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
    MatButtonModule, MatCheckboxModule, MatDatepickerModule, MatIconModule, MatInputModule, MatNativeDateModule, MatRadioModule, MatSelectModule, MatSliderModule, MatSlideToggleModule, MatTabsModule,
    MatTooltipModule, MatChipsModule,MatGridListModule,
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
