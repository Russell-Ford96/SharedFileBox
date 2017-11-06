import { Component, OnInit } from '@angular/core';
import { ROUTE_TRANSITION } from '../../app.animation';
import {AuthService} from "../../auth/auth.service";

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


  constructor(
    private auth: AuthService
  ) { }

  ngOnInit() {
    if(this.auth.userProfile){
      console.log(this.auth.userProfile);
      this.email= this.auth.userProfile.email;
      this.name= this.auth.userProfile.nickname;
    }

  }

}
