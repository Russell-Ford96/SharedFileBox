import { Routes } from '@angular/router';
import {SentComponent} from "./sent/sent.component";
import {InboxComponent} from "./inbox/inbox.component";

export const mailRoutes: Routes = [
  {
    path: 'mail/inbox',
    component: InboxComponent
  },
  {
    path: 'mail/sent',
    component: SentComponent
  }
];
