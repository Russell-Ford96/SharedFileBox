import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';

@Component({
  selector: 'vr-components-tooltip',
  templateUrl: './components-tooltip.component.html'
})
export class ComponentsTooltipComponent implements OnInit {

  tooltipHTML: string = _.escape(
`<button md-icon-button mdTooltip="Favorite this">
  <md-icon>favorite</md-icon>
</button>`);

  constructor() { }

  ngOnInit() {
  }

}
