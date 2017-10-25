import { Routes } from '@angular/router';
import { FormElementsComponent } from './form-elements/form-elements.component';
import { FormWizardComponent } from './form-wizard/form-wizard.component';
import {MessageComponent} from './message/message.component';

export const formRoutes: Routes = [
  {
    path: 'forms/form-elements',
    component: FormElementsComponent
  },
  {
    path: 'forms/form-wizard',
    component: FormWizardComponent
  },
  {
    path: 'forms/message',
    component: MessageComponent
  }
];
