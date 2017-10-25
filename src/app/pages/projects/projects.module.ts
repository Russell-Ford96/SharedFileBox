import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectsComponent } from './projects.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { MdButtonModule, MdIconModule, MdListModule, MdMenuModule, MdSelectModule, MdTooltipModule } from '@angular/material';
import { PageHeaderModule } from '../../core/page-header/page-header.module';
import { BreadcrumbsModule } from '../../core/breadcrumbs/breadcrumbs.module';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    PageHeaderModule,
    BreadcrumbsModule,
    FlexLayoutModule,
    MdButtonModule,
    MdIconModule,
    MdSelectModule,
    MdMenuModule,
    MdListModule,
    MdTooltipModule
  ],
  declarations: [ProjectsComponent]
})
export class ProjectsModule { }
