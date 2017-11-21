import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';

@Component({
  selector: 'vr-components-tooltip',
  templateUrl: './components-tooltip.component.html'
})
export class ComponentsTooltipComponent implements OnInit {

  tooltipHTML: string = _.escape(
`<button mat-icon-button mdTooltip="Favorite this">
  <mat-icon>favorite</mat-icon>
</button>`);

  constructor() { }

  ngOnInit() {
  }

}
