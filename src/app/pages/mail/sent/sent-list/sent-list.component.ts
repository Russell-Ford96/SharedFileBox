import { Component, Input, Output, EventEmitter, OnInit, ViewChild,ElementRef, AfterViewChecked } from '@angular/core';

import { ScrollbarComponent, scrollbarOptions } from '../../../../core/scrollbar/scrollbar.component';
import Scrollbar from 'smooth-scrollbar';

@Component({
  selector: 'vr-sent-list',
  templateUrl: './sent-list.component.html',
  styleUrls: ['./sent-list.component.scss']
})
export class SentListComponent implements OnInit, AfterViewChecked {
  @Input() data: any;
  @Output() activeMsg = new EventEmitter<any>();
  mainScrollbarElem: any;
  scrollbar: any;

  @ViewChild('scrollToBottomElem') scrollToBottomElem: ElementRef;
  @ViewChild('chatScroll') chatScroll: ScrollbarComponent;

  constructor() { }

  ngOnInit() {
  }

  setActiveMsg(item) {
    this.activeMsg.emit(item);
  }


  ngAfterViewChecked(){
    this.mainScrollbarElem = document.getElementById('main-scrollbar');
    console.log('### mainscrollbarelemonInit', this.mainScrollbarElem);
    this.scrollbar = Scrollbar.get(this.mainScrollbarElem);
    if(this.scrollbar){this.scrollbar.destroy();
    }

  }

}
