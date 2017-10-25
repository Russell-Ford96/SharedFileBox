import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsProgressComponent } from './components-progress.component';
import { UtilsModule } from '../../../core/utils/utils.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MdCardModule, MdProgressBarModule, MdProgressSpinnerModule, MdRadioModule, MdSliderModule, MdTabsModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    UtilsModule,
    FlexLayoutModule,
    MdCardModule,
    MdTabsModule,
    MdProgressSpinnerModule,
    MdProgressBarModule,
    MdRadioModule,
    MdSliderModule
  ],
  declarations: [ComponentsProgressComponent],
  exports: [ComponentsProgressComponent]
})
export class ComponentsProgressModule { }
