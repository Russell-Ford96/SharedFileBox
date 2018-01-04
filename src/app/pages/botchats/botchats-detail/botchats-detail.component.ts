import { Component, OnInit, Input, EventEmitter, Output, trigger, state, style, transition, animate  } from '@angular/core';

@Component({
  selector: 'vr-botchats-detail',
  templateUrl: './botchats-detail.component.html',
  styleUrls: ['./botchats-detail.component.scss', ],
  animations: [
          trigger('detailAnimations',[
          state('in',style({
            transform: 'translateX(0)',
            opacity: 1
          })),
          transition('*  => in', animate('300ms cubic-bezier(.92,1.84,.26,-0.77)')),
        ])
  ]
})


export class BotchatsDetailComponent  {
  state: string;
  @Input() activeMsg: any;
  @Output() closeDetailds = new EventEmitter<boolean>();


  constructor() {
    console.log("constructor state", this.state);
    this.state = "in";
  }



  onClose(){
    this.closeDetailds.emit(false);
  }

}
