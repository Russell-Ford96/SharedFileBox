import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InboxComponent } from './inbox.component';
import { InboxComposeComponent } from './inbox-compose/inbox-compose.component';
import { FormsModule } from '@angular/forms';
import { QuillModule } from 'ngx-quill';
import {
  MatButtonModule, MatCheckboxModule, MatDialogModule, MatIconModule, MatInputModule, MatListModule, MatMenuModule,
  MatRippleModule, MatTooltipModule
} from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ScrollbarModule } from '../../core/scrollbar/scrollbar.module';

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    ScrollbarModule,
    FormsModule,
    QuillModule,
    MatButtonModule,
    MatListModule,
    MatIconModule,
    MatCheckboxModule,
    MatRippleModule,
    MatDialogModule,
    MatInputModule,
    MatMenuModule,
    MatTooltipModule
  ],
  entryComponents: [InboxComposeComponent],
  declarations: [InboxComponent, InboxComposeComponent]
})
export class InboxModule { }
