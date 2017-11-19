import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormElementsComponent } from './form-elements/form-elements.component';
import { BreadcrumbsModule } from '../../core/breadcrumbs/breadcrumbs.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import {
  MatButtonModule, MatCheckboxModule, MatDatepickerModule, MatIconModule, MatInputModule, MatNativeDateModule, MatRadioModule, MatSelectModule,
  MatSliderModule,
  MatSlideToggleModule, MatTabsModule,
  MatTooltipModule
} from '@angular/material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { UtilsModule } from '../../core/utils/utils.module';
import { FormWizardComponent } from './form-wizard/form-wizard.component';
import { PageHeaderModule } from '../../core/page-header/page-header.module';
import { MessageComponent } from './message/message.component';
import { FormDialogsComponent, DialogOverviewComponent } from './message/form-dialogs.component';

import { DialogDataService } from './message/dialog-data.service';//

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    BreadcrumbsModule,
    UtilsModule,
    FlexLayoutModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatCheckboxModule,
    MatRadioModule,
    MatSlideToggleModule,
    MatSliderModule,
    MatTabsModule,
    PageHeaderModule,
    ReactiveFormsModule,
  ],
  declarations: [
    FormElementsComponent,
    FormWizardComponent,
    MessageComponent,
    FormDialogsComponent,
    DialogOverviewComponent,
  ],
  entryComponents:[
    FormDialogsComponent,
    DialogOverviewComponent,
  ],
  providers:[    DialogDataService,
]

})
export class FormModule { }
