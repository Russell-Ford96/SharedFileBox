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
  indexOld: number;
  indexNew: number;
  itemSelected: any;
  msg: String;


    // private getItemByPosition(position){
    //   return this.items.find(x => x.position === position);
    // }
    //
    private getIndexInParent(el) {
      return Array.from(el.parentNode.children).indexOf(el)
    }
    //
    // private getElementIndex(el: any) {
    //     return [].slice.call(el.parentElement.children).indexOf(el);
    // }

    private onDrag(args) {
      let [e, el] = args;
      let index = this.getIndexInParent(el);
      console.log("onDrag  position " + index);
      this.indexOld = index;
      //console.log(this.getItemByPosition(index));
      console.log(this.items);
    }

    // private moveItem (array, fromIndex, toIndex) {
    //   const arrayCopy = array.slice()
    //   const item = arrayCopy[fromIndex]
    //   arrayCopy.splice(fromIndex, 1) // remove field that's moving
    //   arrayCopy.splice(toIndex, 0, item) // add it back
    //   //console.log(arrayCopy);
    //   return arrayCopy
    // }

    private onDrop(args) {
      let [e, el] = args;
      let index = this.getIndexInParent(el);
      console.log("New position " + index);
      this.indexNew = index;
      // this.items = (this.moveItem (this.items, this.indexOld, this.indexNew)).slice();

      this.indexOld = -1;
      this.indexNew = -1;
      //(this.getItemByPosition(this.indexOld)).position = this.indexNew;

       //(this.getItemByPosition(this.indexNew)).position = this.indexOld;


      setTimeout(() => {
        for (let i = 0; i < this.items.length; i++) {
           this.items[i].position = i;
         }
         console.log(this.items);
      }, 300);


    }

    // private onOver(args) {
    //   let [e, el, container] = args;
    //   // do something
    // }
    //
    // private onOut(args) {
    //   let [e, el, container] = args;
    //   let index = this.getElementIndex(el);
    //   console.log("onOut position " + index);
    //   // do something
    // }

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
    // dragulaService.over.subscribe((value) => {
    //   //console.log(`over: ${value[0]}`);
    //   this.onOver(value.slice(1));
    // });
    // dragulaService.out.subscribe((value) => {
    //   //console.log(`out: ${value[0]}`);
    //   this.onOut(value.slice(1));
    // });

    this.items = [
      { id: 1,
        done: false,
        name: 'Email Chris about the christmas special',
        date: moment().format('MMM DD'),
        position: 0
      },
      { id: 2,
        done: false,
        name: 'Call Veronica to buy crackers',
        date: moment().subtract(1, 'day').format('MMM DD'),
        position: 1
      },
      { id: 3,
        done: true,
        name: 'Meet with Lenny to get up to date',
        date: moment().subtract(1, 'day').format('MMM DD'),
        position: 2
      },
      { id: 4,
        done: false,
        name: 'Buy that awesome design you saw',
        date: moment().subtract(1, 'day').format('MMM DD'),
        position: 3
      },
      { id: 5,
        done: false,
        name: 'Call Alex to get in touch',
        date: moment().subtract(2, 'day').format('MMM DD'),
        position: 4
      }
    ];
  }

  ngOnInit() {}

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
