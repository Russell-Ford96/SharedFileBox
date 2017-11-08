import { ChangeDetectorRef, Component, OnInit, Input } from '@angular/core';
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
  @Input() items: any[] = [ ];
  itemSelected: any;
  msg: String;

    private getIndexInParent(el) {
      return Array.from(el.parentNode.children).indexOf(el)
    }

    private onDrag(args) {
      let [e, el] = args;
      let index = this.getIndexInParent(el);
      console.log("onDrag  position " + index);
      console.log(this.items);
    }


    private onDrop(args) {
      let [e, el] = args;
      let index = this.getIndexInParent(el);
      console.log("New position " + index);

      setTimeout(() => {
        for (let i = 0; i < this.items.length; i++) {
           this.items[i].position = i;
         }
         console.log(this.items);
      }, 300);


    }

  constructor(
    private snackbar: MdSnackBar,
    private cd: ChangeDetectorRef,
    private dragulaService: DragulaService
  ) {
    dragulaService.setOptions('one-bag', {
      revertOnSpill: true
    });
    dragulaService.drag.subscribe((value) => {
      //console.log(`drag: ${value[0]}`);
      this.onDrag(value.slice(1));
    });
    dragulaService.drop.subscribe((value) => {
      //console.log(`drop: ${value[0]}`);
      this.onDrop(value.slice(1));
    });
  }

  ngOnInit() {}

  // archive(item) {
  //   const index = this.items.indexOf(item);
  //   if (index > -1) {
  //     this.items.splice(index, 1);
  //     const snackbarRef = this.snackbar.open('Archived Item', 'UNDO');
  //
  //     this.cd.markForCheck();
  //
  //     snackbarRef.onAction().subscribe(() => {
  //       this.items.splice(index, 0, item);
  //
  //       this.cd.markForCheck();
  //     });
  //   }
  // }

}
