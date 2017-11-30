import { Component,EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'vr-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {
  showWelcome = true;
  @Output() showTheBot = new EventEmitter<{customerFullName: string, customerPhoneNumber: string}>();
  customerFullName:string;
  customerPhoneNumber:string;
  constructor() {}

  ngOnInit(): void {

  }

  isShowWelcome(){
    return this.showWelcome;
  }

  onShowBot(){

    this.showTheBot.emit({customerFullName:this.customerFullName,customerPhoneNumber:this.customerPhoneNumber});
    this.showWelcome = false;
  }

}
