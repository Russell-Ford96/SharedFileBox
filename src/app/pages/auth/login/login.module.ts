import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MdButtonModule, MdCheckboxModule, MdInputModule } from '@angular/material';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    FlexLayoutModule,
    MdInputModule,
    MdButtonModule,
    MdCheckboxModule
  ],
  declarations: [LoginComponent]
})
export class LoginModule { }
