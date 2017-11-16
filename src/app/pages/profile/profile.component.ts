import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ROUTE_TRANSITION } from '../../app.animation';
import { AuthService } from "../../auth/auth.service";
import { AppService } from '../../app.service';
import { Bot } from './bot.model';

@Component({
  selector: 'vr-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  animations: [...ROUTE_TRANSITION],
  host: { '[@routeTransition]': '' }
})
export class ProfileComponent implements OnInit {
  email: any;
  name:string;
  tabSelected: number;
  showFormBot: Boolean;
  picture:string;
  botSelected: Bot;
  botsElements: Bot[];


  constructor(
    private auth: AuthService,
    private appService: AppService,
    private route: ActivatedRoute,
    private cdr:ChangeDetectorRef
  ) {


    //this.getAllBots();
    this.tabSelected = 0;
    this.showFormBot = false;
    this.botSelected = {_id: "",name: "", url: "", itemArray:[{}], createdBy: "", thanks: "", active: true };
    if(this.auth.userProfile){
      console.log(this.auth.userProfile);
      this.picture = this.auth.userProfile.picture;
      this.email= this.auth.userProfile.email;
      this.name= this.auth.userProfile.nickname;
    }

  }

  onShowBots(){
    console.log("################ profile.component->list bots ################");
    this.botsElements = [];
    this.getAllBots();
    this.tabSelected = 0;
    this.showFormBot = false;
  }

  onNewBot(){
    console.log("################ profile.component->New Bot ################");

    this.botSelected = {_id: "",name: "", url: "", itemArray:[{}], createdBy: "", thanks: "", active: true };
    this.tabSelected = 1;
    this.showFormBot = true;
  }

  onBotSelected(botData: Bot){
    console.log("################ profile.component ################");
    console.log(botData);
    this.botSelected = botData;
    this.tabSelected = 1;
    this.showFormBot = true;
  }

  ngOnInit() {

    this.getAllBots();

    // this.route.data
    //   .subscribe((bots: any[]) => {
    //     this.botsElements = bots;
    //     console.log("botsElements");
    //     console.log(  this.botsElements );
    //   });
  }

  getAllBots(){

    this.appService.getAllBotData().then((bots: any[]) => {
      this.botsElements = bots;
      console.log("****************** All my bots *******************");
      console.log(this.botsElements);
      this.cdr.detectChanges();
      return bots;
    });


  }

}
