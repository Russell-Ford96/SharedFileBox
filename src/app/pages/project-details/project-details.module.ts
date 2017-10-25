import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectDetailsComponent } from './project-details.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { PageHeaderModule } from '../../core/page-header/page-header.module';
import { BreadcrumbsModule } from '../../core/breadcrumbs/breadcrumbs.module';
import {
  MdButtonModule, MdChipsModule, MdIconModule, MdProgressBarModule, MdProgressSpinnerModule,
  MdTooltipModule
} from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    PageHeaderModule,
    BreadcrumbsModule,
    MdIconModule,
    MdProgressBarModule,
    MdProgressSpinnerModule,
    MdButtonModule,
    MdChipsModule,
    MdTooltipModule
  ],
  declarations: [ProjectDetailsComponent]
})
export class ProjectDetailsModule { }
