import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormElementsComponent } from './form-elements/form-elements.component';
import { BreadcrumbsModule } from '../../core/breadcrumbs/breadcrumbs.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import {
  MdButtonModule, MdCheckboxModule, MdDatepickerModule, MdIconModule, MdInputModule, MdNativeDateModule, MdRadioModule, MdSelectModule,
  MdSliderModule,
  MdSlideToggleModule, MdTabsModule,
  MdTooltipModule
} from '@angular/material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { UtilsModule } from '../../core/utils/utils.module';
import { FormWizardComponent } from './form-wizard/form-wizard.component';
import { PageHeaderModule } from '../../core/page-header/page-header.module';
import {MessageComponent} from './message/message.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    BreadcrumbsModule,
    UtilsModule,
    FlexLayoutModule,
    MdIconModule,
    MdButtonModule,
    MdTooltipModule,
    MdInputModule,
    MdDatepickerModule,
    MdNativeDateModule,
    MdSelectModule,
    MdCheckboxModule,
    MdRadioModule,
    MdSlideToggleModule,
    MdSliderModule,
    MdTabsModule,
    PageHeaderModule,
    ReactiveFormsModule
  ],
  declarations: [
    FormElementsComponent,
    FormWizardComponent,
    MessageComponent,

  ]
})
export class FormModule { }
