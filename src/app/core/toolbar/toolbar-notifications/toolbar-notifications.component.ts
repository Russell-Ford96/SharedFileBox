import { ChangeDetectorRef, Component, OnInit, trigger, state, style, transition, animate } from '@angular/core';
import moment from 'moment/src/moment';
import { LIST_FADE_ANIMATION } from '../../utils/list.animation';
import { AppSocketService } from '../../../app.socket.service';

@Component({
  selector: 'vr-toolbar-notifications',
  templateUrl: './toolbar-notifications.component.html',
  styleUrls: ['./toolbar-notifications.component.scss'],
  animations: [...LIST_FADE_ANIMATION,
    trigger('notificationAnimation',[
        state('small',style({
          transform: 'scale(1)',
        })),
        state('large', style({
          transform: 'scale(1.2)',
        })),
        state('superSmall', style({
          transform: 'scale(0.8)',
        })),

        transition('small  => large', animate('250ms ease-in')),
        transition('large  => superSmall', animate('100ms ease-in')),
        transition('superSmall  => small', animate('100ms ease-in')),
      ])
  ]
})
export class ToolbarNotificationsComponent implements OnInit {
  state: string = 'small';
  isOpen: boolean;
  notifications: any[];
  demoTriggers = 0;

  constructor(
    private socketService: AppSocketService,
    private cd: ChangeDetectorRef
  ) { }

  onAnimateNotification(){

    setTimeout(() => {
      this.state = (this.state === 'superSmall' ? 'small' : 'small');
      this.cd.detectChanges();
      console.log("superSmall  => small");

    }, 380);
    setTimeout(() => {
        this.state = (this.state === 'large' ? 'superSmall' : 'superSmall');
        this.cd.detectChanges();
        console.log("large  => superSmall");
    }, 110);
    this.state = (this.state === 'small' ? 'large' : 'large');
    this.cd.detectChanges();
    console.log("small  => large");
  }

  ngOnInit() {

    // This service is to update the data in real time through socket
    this.socketService
      .getNotification()
      .subscribe((message: any) => {
        console.log(message);
        console.log(" *********** On ToolbarNotificationsComponent ********** ");
        //this.getData();
        this.notifications.unshift({
          icon: 'notifications',
          name: message,
          time: moment().fromNow(),
          read: false,
          colorClass: 'accent'
        })

        this.onAnimateNotification();
        this.cd.markForCheck();
      });

    this.notifications = [
      {
        icon: 'notifications',
        name: 'This is a notification',
        time: 'few sec ago',
        read: false,
        colorClass: ''
      },
      {
        icon: 'shopping_basket',
        name: 'User bought your template',
        time: '23 min ago',
        read: false,
        colorClass: 'primary'
      },
      {
        icon: 'eject',
        name: 'Server Crashed',
        time: 'an hour ago',
        read: false,
        colorClass: 'accent'
      },
      {
        icon: 'cached',
        name: 'New user registered',
        time: '6 hours ago',
        read: true,
        colorClass: ''
      },
      {
        icon: 'code',
        name: 'John added you as friend',
        time: 'yesterday',
        read: true,
        colorClass: ''
      }
    ]
  }

  markAsRead(notification) {
    notification.read = true;
  }

  dismiss(notification) {
    this.notifications.splice(this.notifications.indexOf(notification), 1);
    this.triggerDemoNotification();
    this.onAnimateNotification();
  }

  toggleDropdown() {
    this.isOpen = !this.isOpen;
    this.triggerDemoNotification();
  }

  onClickOutside() {
    this.isOpen = false;
  }

  triggerDemoNotification() {
    if (this.demoTriggers === 0) {
      this.demoTriggers++;

      setTimeout(() => {
        this.notifications.unshift({
          icon: 'cached',
          name: 'New user registered',
          time: moment().fromNow(),
          read: false,
          colorClass: '',
        });
        this.onAnimateNotification();
        this.cd.markForCheck();
      }, 2000);
    } else if (this.demoTriggers === 1) {
      this.demoTriggers++;

      setTimeout(() => {
        this.notifications.unshift({
          icon: 'shopping_basket',
          name: 'User bought your template',
          time: '23 min ago',
          read: false,
          colorClass: 'primary'
        });
        this.onAnimateNotification();
        this.cd.markForCheck();
      }, 2000);
    }
  }
}
