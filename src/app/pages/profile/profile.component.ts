import { Component, OnInit, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ROUTE_TRANSITION } from '../../app.animation';
import { AuthService } from "../../auth/auth.service";
import { AppService } from '../../app.service';
import { Bot } from './bot.model';
import { OriginConnectionPosition, Overlay, OverlayConnectionPosition, OverlayRef } from "@angular/cdk/overlay";

@Component({
  selector: 'vr-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  animations: [...ROUTE_TRANSITION],
  host: { '[@routeTransition]': '' }
})
export class ProfileComponent implements OnInit, AfterViewInit {
  email: any;
  name: string;
  tabSelected: number;
  showFormBot: Boolean;
  picture: string;
  botSelected: Bot;
  botsElements: Bot[];

  constructor(
    private auth: AuthService,
    private appService: AppService,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef,
    public overlay: Overlay
  ) {

    const overlayRef = overlay.create();

    this.tabSelected = 0;
    this.showFormBot = false;
    this.botSelected = { _id: "", name: "", url: "", itemArray: [{}], createdBy: "", thanks: "", active: true };
    if (this.auth.userProfile) {
      this.picture = this.auth.userProfile.picture;
      this.email = this.auth.userProfile.email;
      this.name = this.auth.userProfile.nickname;
    }

  }

  onShowBots() {
    this.botsElements = [];
    this.getAllBots();
    this.tabSelected = 0;
    this.showFormBot = false;
  }

  onNewBot() {
    this.botSelected = { _id: "", name: "", url: "", itemArray: [{}], createdBy: "", thanks: "", active: true };
    this.tabSelected = 1;
    this.showFormBot = true;
  }

  onBotSelected(botData: Bot) {
    this.botSelected = botData;
    this.tabSelected = 1;
    this.showFormBot = true;
  }

  ngOnInit() {

    //this.getAllBots();

  }

  ngAfterViewInit() {

    this.getAllBots();

  }

  getAllBots() {
    console.log("getAllBots -> setLoading TRUE");
    this.appService.setLoading(true);
    this.appService.getAllBotData().then((bots: any[]) => {
      this.botsElements = bots;
      console.log("getAllBots -> setLoading FALSE");
      this.appService.setLoading(false);
      this.cdr.detectChanges();

      return bots;
    });


  }

}
