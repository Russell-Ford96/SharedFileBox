import { Component } from '@angular/core';
import { MediaReplayService } from './core/utils/media-replay.service';
import {AuthService} from './auth/auth.service';

@Component({
  selector: 'vr-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(private authService: AuthService) {
    this.authService.handleAuthentication();
  }

  //noinspection JSUnusedLocalSymbols

}
