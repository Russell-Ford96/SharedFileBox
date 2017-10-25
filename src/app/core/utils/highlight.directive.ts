import { AfterViewInit, Directive, ElementRef, NgZone } from '@angular/core';
import * as hljs from 'highlight.js';

@Directive({
  selector: '[vrHighlight]'
})
export class HighlightDirective implements AfterViewInit {

  constructor(private elementRef: ElementRef, private zone: NgZone) {
  }

  ngAfterViewInit() {
    this.zone.runOutsideAngular(() => {
      hljs.highlightBlock(this.elementRef.nativeElement);
    });
  }

}
