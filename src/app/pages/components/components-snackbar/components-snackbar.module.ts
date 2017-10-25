import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsSnackbarComponent } from './components-snackbar.component';
import { MdButtonModule, MdCardModule, MdSnackBarModule, MdTabsModule } from '@angular/material';
import { UtilsModule } from '../../../core/utils/utils.module';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  imports: [
    CommonModule,
    UtilsModule,
    FlexLayoutModule,
    MdCardModule,
    MdTabsModule,
    MdSnackBarModule,
    MdButtonModule
  ],
  declarations: [ComponentsSnackbarComponent],
  exports: [ComponentsSnackbarComponent]
})
export class ComponentsSnackbarModule { }
