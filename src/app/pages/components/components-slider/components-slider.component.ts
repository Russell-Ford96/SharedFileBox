import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';

@Component({
  selector: 'vr-components-slider',
  templateUrl: './components-slider.component.html'
})
export class ComponentsSliderComponent implements OnInit {

  slider1HTML: string = _.escape(`
  <mat-slider min="1" max="10" thumbLabel tickInterval="1"></mat-slider>
  `);

  slider2HTML: string = _.escape(`<mat-slider vertical min="1" max="10" thumbLabel tickInterval="1"></mat-slider>`);

  slider3HTML: string = _.escape(`<mat-slider min="1" max="10"></mat-slider>`);

  constructor() { }

  ngOnInit() {
  }

}
