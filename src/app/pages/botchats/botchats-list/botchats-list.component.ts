import { Component, Input, Output, EventEmitter, OnInit, ViewChild,ElementRef, AfterViewChecked } from '@angular/core';
import { ScrollbarComponent, scrollbarOptions } from '../../../core/scrollbar/scrollbar.component';
import Scrollbar from 'smooth-scrollbar';


@Component({
  selector: 'vr-botchats-list',
  templateUrl: './botchats-list.component.html',
  styleUrls: ['./botchats-list.component.scss', ],
})

export class BotchatsListComponent {
  @Input() data: any;
  @Output() activeMsg = new EventEmitter<any>();
  mainScrollbarElem: any;
  scrollbar: any;



  setActiveMsg(item){
    this.activeMsg.emit(item);
  }





}
