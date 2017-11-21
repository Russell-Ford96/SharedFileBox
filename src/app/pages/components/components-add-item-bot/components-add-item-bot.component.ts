import { ChangeDetectorRef, Component, OnInit, Input } from '@angular/core';
import moment from 'moment/src/moment';
import { MatSnackBar } from '@angular/material';
import { LIST_FADE_ANIMATION } from '../../../core/utils/list.animation';
import { DragulaService } from 'ng2-dragula';

@Component({
  selector: 'vr-components-add-item-bot',
  templateUrl: './components-add-item-bot.component.html',
  styleUrls: ['./components-add-item-bot.component.scss'],
  animations: [...LIST_FADE_ANIMATION]
})
export class ComponentsAddItemBotComponent implements OnInit {
  @Input() items: { name: String, file: boolean, position: number, edit:boolean }[] = [{ name: '', file: false, position: 0, edit:false }];

  itemEditing: any;

  private getIndexInParent(el) {
    return Array.from(el.parentNode.children).indexOf(el)
  }

  private onOver(args) {
    let [e, el, container] = args;
    // do something
  }

  private onOut(args) {
    let [e, el, container] = args;
    // do something
  }

  private onDrag(args) {
    let [e, el] = args;
    let index = this.getIndexInParent(el);
  }


  private onDrop(args) {
    let [e, el] = args;
    let index = this.getIndexInParent(el);

    setTimeout(() => {
      for (let i = 0; i < this.items.length; i++) {
        this.items[i].position = i;
      }
      console.log(this.items);
    }, 100);
  }
  private onKeydown(event){
    if (event.key === "Enter") {
        console.log(event);
        this.itemEditing = {};
    }
  }

  private onEditItem(item){
    this.itemEditing = item;
  }

  constructor(
    private snackbar: MatSnackBar,
    private cd: ChangeDetectorRef,
    private dragulaService: DragulaService
  ) {
    const bag: any = this.dragulaService.find('one-bag');

    if (bag !== undefined) {
      this.dragulaService.destroy('one-bag');
    };

    dragulaService.setOptions('one-bag', {
      revertOnSpill: true,
      removeOnSpill: true
    });
    dragulaService.drag.subscribe((value) => {
      this.onDrag(value.slice(1));
    });
    dragulaService.drop.subscribe((value) => {
      this.onDrop(value.slice(1));
    });
    dragulaService.over.subscribe((value) => {
      this.onOver(value.slice(1));
    });
    dragulaService.out.subscribe((value) => {
      this.onOut(value.slice(1));
    });
  }


  ngOnInit() { }

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
