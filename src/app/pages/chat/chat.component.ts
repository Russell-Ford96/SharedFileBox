import { ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { chatDemoData } from './chat.demo';
import * as _ from 'lodash';
import * as moment from 'moment';
import { ScrollbarComponent, scrollbarOptions } from '../../core/scrollbar/scrollbar.component';
import Scrollbar from 'smooth-scrollbar';
import { ROUTE_TRANSITION } from '../../app.animation';

@Component({
  selector: 'vr-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
  animations: [...ROUTE_TRANSITION],
  host: { '[@routeTransition]': '' }
})
export class ChatComponent implements OnInit, OnDestroy {

  mainScrollbarElem: any;
  scrollbar: any;

  chats: any[];
  activeChat: any;
  newMessage: string;

  @ViewChild('scrollToBottomElem') scrollToBottomElem: ElementRef;
  @ViewChild('chatScroll') chatScroll: ScrollbarComponent;

  constructor(private cd: ChangeDetectorRef) { }

  ngOnInit() {
    this.chats = _.sortBy(chatDemoData, 'lastMessageTime').reverse();
    this.activeChat = this.chats[0];
    this.mainScrollbarElem = document.getElementById('main-scrollbar');
    this.scrollbar = Scrollbar.get(this.mainScrollbarElem);
    this.scrollbar.destroy();
  }

  setActiveChat(chat) {
    this.activeChat = chat;
  }

  send() {
    if (this.newMessage) {
      this.chats[0].messages.push({
        message: this.newMessage,
        when: moment(),
        who: 'me'
      });

      this.newMessage = '';

      this.cd.markForCheck();

      this.chatScroll.scrollbarRef.scrollIntoView(this.scrollToBottomElem.nativeElement, {
        alignToTop: false
      });

      setTimeout(() => {
        this.chats[0].messages.push({
          message: 'Oh look! I can even answer you. ;)',
          when: moment(),
          who: 'partner'
        });

        this.cd.markForCheck();

        this.chatScroll.scrollbarRef.scrollIntoView(this.scrollToBottomElem.nativeElement, {
          alignToTop: false
        });
      }, 1000)
    }
  }

  clearMessages(activeChat) {
    activeChat.messages.length = 0;
  }

  ngOnDestroy() {
    Scrollbar.init(this.mainScrollbarElem, scrollbarOptions);
  }
}
