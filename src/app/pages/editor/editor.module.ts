import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditorComponent } from './editor.component';
import { QuillModule } from 'ngx-quill';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    MatIconModule,
    QuillModule
  ],
  declarations: [EditorComponent]
})
export class EditorModule { }
