import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';

@Component({
  selector: 'vr-components-progress',
  templateUrl: './components-progress.component.html',
  styleUrls: ['./components-progress.component.scss']
})
export class ComponentsProgressComponent implements OnInit {

  color = 'accent';
  mode = 'indeterminate';
  progressValue = 50;
  bufferValue = 75;

  spinnerColor = 'accent';
  spinnerMode = 'indeterminate';
  spinnerValue = 50;

  progressbarHTML = _.escape(
`<section fxLayout="row" fxLayoutAlign="start center">
  <div class="margin">Color:</div>
  <mat-radio-group [(ngModel)]="color">
    <mat-radio-button class="margin" value="primary">
      Primary
    </mat-radio-button>
    <mat-radio-button class="margin" value="accent">
      Accent
    </mat-radio-button>
    <mat-radio-button class="margin" value="warn">
      Warn
    </mat-radio-button>
  </mat-radio-group>
</section>

<section fxLayout="row" fxLayoutAlign="start center">
  <div class="margin">Mode:</div>
  <mat-radio-group [(ngModel)]="mode">
    <mat-radio-button class="margin" value="determinate">
      Determinate
    </mat-radio-button>
    <mat-radio-button class="margin" value="indeterminate">
      Indeterminate
    </mat-radio-button>
    <mat-radio-button class="margin" value="buffer">
      Buffer
    </mat-radio-button>
    <mat-radio-button class="margin" value="query">
      Query
    </mat-radio-button>
  </mat-radio-group>
</section>

<section fxLayout="row" fxLayoutAlign="start center" *ngIf="mode == 'determinate' || mode == 'buffer'">
  <div class="margin">Progress:</div>
  <mat-slider class="margin" [(ngModel)]="progressValue"></mat-slider>
</section>
<section fxLayout="row" fxLayoutAlign="start center" *ngIf="mode == 'buffer'">
  <div class="margin">Buffer:</div>
  <mat-slider class="margin" [(ngModel)]="bufferValue"></mat-slider>
</section>

<section fxLayout="row" fxLayoutAlign="start center">
  <mat-progress-bar
    class="margin"
    [color]="color"
    [mode]="mode"
    [value]="progressValue"
    [bufferValue]="bufferValue">
  </mat-progress-bar>
</section>`);

  progressSpinnerHTML = _.escape(
`<section fxLayout="row" fxLayoutAlign="start center">
  <label class="margin">Color:</label>
  <mat-radio-group [(ngModel)]="spinnerColor">
    <mat-radio-button class="margin" value="primary">
      Primary
    </mat-radio-button>
    <mat-radio-button class="margin" value="accent">
      Accent
    </mat-radio-button>
    <mat-radio-button class="margin" value="warn">
      Warn
    </mat-radio-button>
  </mat-radio-group>
</section>

<section fxLayout="row" fxLayoutAlign="start center">
  <label class="margin">Mode:</label>
  <mat-radio-group [(ngModel)]="spinnerMode">
    <mat-radio-button class="margin" value="determinate">
      Determinate
    </mat-radio-button>
    <mat-radio-button class="margin" value="indeterminate">
      Indeterminate
    </mat-radio-button>
  </mat-radio-group>
</section>

<section fxLayout="row" fxLayoutAlign="start center" *ngIf="spinnerMode == 'determinate'">
  <label class="margin">Progress:</label>
  <mat-slider class="margin" [(ngModel)]="spinnerValue"></mat-slider>
</section>

<div fxLayout="row" fxLayoutAlign="center center">
  <mat-progress-spinner
    class="margin"
    [color]="spinnerColor"
    [mode]="spinnerMode"
    [value]="spinnerValue">
  </mat-progress-spinner>
</div>`);

  constructor() { }

  ngOnInit() {
  }

}
