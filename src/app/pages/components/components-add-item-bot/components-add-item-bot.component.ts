import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import moment from 'moment/src/moment';
import { MdSnackBar } from '@angular/material';
import { LIST_FADE_ANIMATION } from '../../../core/utils/list.animation';
import { DragulaService } from 'ng2-dragula';

@Component({
  selector: 'vr-components-add-item-bot',
  templateUrl: './components-add-item-bot.component.html',
  styleUrls: ['./components-add-item-bot.component.scss'],
  animations: [...LIST_FADE_ANIMATION]
})
export class ComponentsAddItemBotComponent implements OnInit {

  items: any[] = [ ];

  private onDrag(args) {
      let [e, el] = args;
      // do something
    }

    private onDrop(args) {
      let [e, el] = args;
      // do something
    }

    private onOver(args) {
      let [e, el, container] = args;
      // do something
    }

    private onOut(args) {
      let [e, el, container] = args;
      // do something
    }

  constructor(
    private snackbar: MdSnackBar,
    private cd: ChangeDetectorRef,
    private dragulaService: DragulaService
  ) {
    dragulaService.drag.subscribe((value) => {
      console.log(`drag: ${value[0]}`);
      this.onDrag(value.slice(1));
    });
    dragulaService.drop.subscribe((value) => {
      console.log(`drop: ${value[0]}`);
      this.onDrop(value.slice(1));
    });
    dragulaService.over.subscribe((value) => {
      console.log(`over: ${value[0]}`);
      this.onOver(value.slice(1));
    });
    dragulaService.out.subscribe((value) => {
      console.log(`out: ${value[0]}`);
      this.onOut(value.slice(1));
    });
  }

  ngOnInit() {
    this.items = [
      {
        done: false,
        name: 'Email Chris about the christmas special',
        date: moment().format('MMM DD')
      },
      {
        done: false,
        name: 'Call Veronica to buy crackers',
        date: moment().subtract(1, 'day').format('MMM DD')
      },
      {
        done: true,
        name: 'Meet with Lenny to get up to date',
        date: moment().subtract(1, 'day').format('MMM DD')
      },
      {
        done: false,
        name: 'Buy that awesome design you saw',
        date: moment().subtract(1, 'day').format('MMM DD')
      },
      {
        done: false,
        name: 'Call Alex to get in touch',
        date: moment().subtract(2, 'day').format('MMM DD')
      }
    ];
  }

  archive(item) {
    const index = this.items.indexOf(item);
    if (index > -1) {
      this.items.splice(index, 1);
      const snackbarRef = this.snackbar.open('Archived Item', 'UNDO');

      this.cd.markForCheck();

      snackbarRef.onAction().subscribe(() => {
        this.items.splice(index, 0, item);

        this.cd.markForCheck();
      });
    }
  }

}
