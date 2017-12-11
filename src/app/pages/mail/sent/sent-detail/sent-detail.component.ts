import { Component, OnInit, Input, EventEmitter, Output, trigger, state, style, transition, animate  } from '@angular/core';

@Component({
  selector: 'vr-sent-detail',
  templateUrl: './sent-detail.component.html',
  styleUrls: ['./sent-detail.component.scss'],
  animations: [
          trigger('detailAnimations',[
          state('in',style({
            transform: 'translateX(0)',
            //transform: 'rotate(0)',
            opacity: 1
          })),

          //transition('small  => large', animate('300ms cubic-bezier(.92,1.84,.87,-1.02)')),
          transition('*  => in', animate('300ms cubic-bezier(.92,1.84,.26,-0.77)')),
          //transition('*  => leave', animate('300ms ease-in')),
        ])
  ]
})
export class SentDetailComponent implements OnInit {
  state: string;
  @Input() activeMsg: any;
  @Output() closeDetailds = new EventEmitter<boolean>();
  constructor() {
    console.log("constructor state");

    console.log(this.state);
    this.state = "in";
  }

  ngOnInit() {
   console.log("ngOnInit state");
   console.log(this.state);
  }

  onClose(){
    this.closeDetailds.emit(false);
  }

}
