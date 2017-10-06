import { NgModule } from '@angular/core';
import { ChartsModule } from 'ng2-charts/ng2-charts';

import { MessageComponent } from './message.component';
import { MessageRoutingModule } from './message-routing.module';
import {CommonModule} from "@angular/common";
import {ReactiveFormsModule} from "@angular/forms";


@NgModule({
  imports: [
    MessageRoutingModule,
    ChartsModule,
    CommonModule,
    ReactiveFormsModule

  ],
  declarations: [ MessageComponent ]
})
export class MessageModule { }
