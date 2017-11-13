import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormModule } from './forms/forms.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { ProfileModule } from './profile/profile.module';
import { ComponentsModule } from './components/components.module';
import { InboxModule } from './inbox/inbox.module';
import { TablesModule } from './tables/tables.module';
import { AuthModule } from './auth/auth.module';
import { EditorModule } from './editor/editor.module';
import { DragAndDropModule } from './drag-and-drop/drag-and-drop.module';
import { IconModule } from './icon/icon.module';
import { GoogleMapsModule } from './google-maps/google-maps.module';
import { ProjectsModule } from './projects/projects.module';
import { ProjectDetailsModule } from './project-details/project-details.module';
import {RequestModule} from './request/request.module';
import {MailModule} from "./mail/mail.module";
import {ChatModule} from "./chat/chat.module";


@NgModule({
  imports: [
    CommonModule,
    DashboardModule,
    FormModule,
    ProfileModule,
    ComponentsModule,
    InboxModule,
    TablesModule,
    AuthModule,
    EditorModule,
    DragAndDropModule,
    IconModule,
    GoogleMapsModule,
    ProjectsModule,
    ProjectDetailsModule,
    RequestModule,
    MailModule,
    ChatModule


  ],
  declarations: []
})
export class PagesModule { }
