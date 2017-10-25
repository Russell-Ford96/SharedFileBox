import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MdButtonModule, MdChipsModule, MdIconModule, MdTabsModule } from '@angular/material';
import { ProfileOverviewComponent } from './profile-overview/profile-overview.component';
import { BreadcrumbsModule } from '../../core/breadcrumbs/breadcrumbs.module';
import { PageHeaderModule } from '../../core/page-header/page-header.module';

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    PageHeaderModule,
    MdButtonModule,
    MdIconModule,
    MdTabsModule,
    MdChipsModule,
    BreadcrumbsModule
  ],
  declarations: [ProfileComponent, ProfileOverviewComponent]
})
export class ProfileModule { }
