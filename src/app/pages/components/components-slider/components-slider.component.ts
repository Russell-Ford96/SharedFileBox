import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';

@Component({
  selector: 'vr-components-slider',
  templateUrl: './components-slider.component.html'
})
export class ComponentsSliderComponent implements OnInit {

  slider1HTML: string = _.escape(`
  <md-slider min="1" max="10" thumbLabel tickInterval="1"></md-slider>
  `);

  slider2HTML: string = _.escape(`<md-slider vertical min="1" max="10" thumbLabel tickInterval="1"></md-slider>`);

  slider3HTML: string = _.escape(`<md-slider min="1" max="10"></md-slider>`);

  constructor() { }

  ngOnInit() {
  }

}
