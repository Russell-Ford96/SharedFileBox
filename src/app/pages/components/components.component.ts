import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import Scrollbar from 'smooth-scrollbar';
import { ROUTE_TRANSITION } from '../../app.animation';

@Component({
  selector: 'vr-components',
  templateUrl: './components.component.html',
  animations: [...ROUTE_TRANSITION],
  host: { '[@routeTransition]': '' }
})
export class ComponentsComponent implements OnInit, AfterViewInit {

  scrollbar: any;

  @ViewChild('sticky') sticky: ElementRef;

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.scrollbar = Scrollbar.get(document.getElementById('main-scrollbar'));

    const marginTop = 180;
    const scrollHeight = this.scrollbar.targets.content.clientHeight - marginTop;

    this.scrollbar.addListener(({ offset }) => {
      const distance = offset.y;

      if (distance >= marginTop) {
        if (distance > scrollHeight) {
          this.sticky.nativeElement.style.top = scrollHeight - marginTop + 'px';
        } else {
          this.sticky.nativeElement.style.top = distance - marginTop + 'px';
        }
      } else {
        this.sticky.nativeElement.style.top = '0px';
      }
    });
  };

  scrollTo(elem) {
    this.scrollbar.scrollIntoView(elem, {
      offsetTop: 23
    });
  }
}
