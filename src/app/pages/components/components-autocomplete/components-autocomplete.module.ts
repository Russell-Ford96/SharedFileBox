import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsAutocompleteComponent } from './components-autocomplete.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MdAutocompleteModule, MdCardModule, MdInputModule, MdTabsModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { UtilsModule } from '../../../core/utils/utils.module';

@NgModule({
  imports: [
    CommonModule,
    UtilsModule,
    FlexLayoutModule,
    MdCardModule,
    MdTabsModule,
    FormsModule,
    ReactiveFormsModule,
    MdAutocompleteModule,
    MdInputModule,

  ],
  declarations: [ComponentsAutocompleteComponent],
  exports: [ComponentsAutocompleteComponent]
})
export class ComponentsAutocompleteModule { }
