import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BotSimulatorComponent } from '../../bot-simulator/bot-simulator.component';

import {
  MatButtonModule, MatCheckboxModule, MatDatepickerModule, MatIconModule, MatInputModule, MatNativeDateModule, MatRadioModule, MatSelectModule, MatSliderModule, MatSlideToggleModule, MatTabsModule,MatExpansionModule,
  MatTooltipModule, MatChipsModule, MatGridListModule,
  MatStepperModule,MatSnackBarModule,MatProgressSpinnerModule,MatProgressBarModule
} from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BotsOverviewComponent } from './bots-overview/bots-overview.component';
import { BreadcrumbsModule } from '../../core/breadcrumbs/breadcrumbs.module';
import { PageHeaderModule } from '../../core/page-header/page-header.module';
import { BotsCreationComponent } from "./bots-creation/bots-creation.component";
import { ComponentsAddItemBotModule } from '../components/components-add-item-bot/components-add-item-bot.module';
import { BotsPreviewComponent } from './bots-preview/bots-preview.component';
import { ProfileRoutes } from './profile.routing';
import { LoadingModule, ANIMATION_TYPES } from 'ngx-loading';


@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    PageHeaderModule,
    LoadingModule.forRoot({
        animationType: ANIMATION_TYPES.threeBounce,
        //animationType: ANIMATION_TYPES.wanderingCubes,
        //animationType: ANIMATION_TYPES.rotatingPlane,
        //animationType: ANIMATION_TYPES.rectangleBounce,
        backdropBackgroundColour: 'rgba(0,0,0,0.1)',
        backdropBorderRadius: '4px',
        primaryColour: '#ffffff',
        secondaryColour: '#ffffff',
        tertiaryColour: '#ffffff'
    }),
    FormsModule,
    ReactiveFormsModule,
    BreadcrumbsModule,
    RouterModule.forRoot(ProfileRoutes),
    ComponentsAddItemBotModule,

    //Material Design
    MatButtonModule,
    MatCheckboxModule, MatDatepickerModule, MatIconModule, MatInputModule, MatNativeDateModule, MatRadioModule, MatSelectModule, MatSliderModule, MatSlideToggleModule, MatTabsModule,MatExpansionModule,
    MatTooltipModule, MatChipsModule,MatGridListModule,
    MatStepperModule,MatSnackBarModule,MatProgressSpinnerModule,MatProgressBarModule,

  ],
  declarations: [
    ProfileComponent,
    BotsOverviewComponent,
    BotsCreationComponent,
    BotsPreviewComponent,
    BotSimulatorComponent]
})
export class ProfileModule { }
