import { Component } from '@angular/core';
import { MediaReplayService } from './core/utils/media-replay.service';
import { AuthService } from './auth/auth.service';
import { AppService } from './app.service';

@Component({
  selector: 'vr-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public loading:boolean;

  constructor(private authService: AuthService,
              private appService: AppService) {
    this.authService.handleAuthentication();
    if(this.authService.userProfile){
      console.log(this.authService.userProfile);



    }

    // this.isLoading();
  }

  isLoading(){
    //setTimeout(() => {
          //console.log(this.loading);
      try{
       return this.appService.isLoading();
      } catch (e) {
      // No content response..
       console.log(e);
       return false;
      }
     //}, 0);
    //return this.appService.loading;
  }



  //noinspection JSUnusedLocalSymbols

}
