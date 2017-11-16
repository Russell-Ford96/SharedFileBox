import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BotSimulatorComponent } from '../../bot-simulator/bot-simulator.component';
import {
  MatButtonModule, MatCheckboxModule, MatDatepickerModule, MatIconModule, MatInputModule, MatNativeDateModule, MatRadioModule, MatSelectModule, MatSliderModule, MatSlideToggleModule, MatTabsModule,MatExpansionModule,
  MatTooltipModule, MatChipsModule, MatGridListModule,
  MatStepperModule,MatSnackBarModule,MatProgressSpinnerModule
} from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BotsOverviewComponent } from './bots-overview/bots-overview.component';
import { BreadcrumbsModule } from '../../core/breadcrumbs/breadcrumbs.module';
import { PageHeaderModule } from '../../core/page-header/page-header.module';
import { BotsCreationComponent } from "./bots-creation/bots-creation.component";
import { ComponentsAddItemBotModule } from '../components/components-add-item-bot/components-add-item-bot.module';
import { BotsPreviewComponent } from './bots-preview/bots-preview.component';
import { ProfileRoutes } from './profile.routing';

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    PageHeaderModule,
    MatButtonModule, MatCheckboxModule, MatDatepickerModule, MatIconModule, MatInputModule, MatNativeDateModule, MatRadioModule, MatSelectModule, MatSliderModule, MatSlideToggleModule, MatTabsModule,MatExpansionModule,
    MatTooltipModule, MatChipsModule,MatGridListModule,
    MatStepperModule,MatSnackBarModule,MatProgressSpinnerModule,
    FormsModule,
    ReactiveFormsModule,
    BreadcrumbsModule,
    ComponentsAddItemBotModule,
    RouterModule.forRoot(ProfileRoutes)
  ],
  declarations: [
    ProfileComponent,
    BotsOverviewComponent,
    BotsCreationComponent,
    BotsPreviewComponent,
    BotSimulatorComponent]
})
export class ProfileModule { }
