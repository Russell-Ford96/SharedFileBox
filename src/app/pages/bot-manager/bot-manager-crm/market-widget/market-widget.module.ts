import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MarketWidgetComponent } from './market-widget.component';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MdButtonModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    FlexLayoutModule,
    MdButtonModule
  ],
  declarations: [MarketWidgetComponent],
  exports: [MarketWidgetComponent]
})
export class MarketWidgetModule { }
