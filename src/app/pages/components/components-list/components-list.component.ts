import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';

@Component({
  selector: 'vr-components-list',
  templateUrl: './components-list.component.html'
})
export class ComponentsListComponent implements OnInit {

  twoLineListHTML: string = _.escape(`
  <mat-list class="demo-list mat-elevation-z2">
    <mat-list-item>
      <img mat-list-avatar src="assets/img/avatars/John.png">
      <h3 mat-line>John</h3>
      <p mat-line>
        <span>Brunch?</span>
        <span class="subline">-- Did you want to go on Sunday? I was thinking</span>
      </p>
    </mat-list-item>
    <mat-list-item>
      <img mat-list-avatar src="assets/img/avatars/Peter.png">
      <h3 mat-line>Peter</h3>
      <p mat-line>
        <span>Summer BBQ</span>
        <span class="subline">-- Wish I could come, but I have some special</span>
      </p>
    </mat-list-item>
    <mat-list-item>
      <img mat-list-avatar src="assets/img/avatars/Nancy.png">
      <h3 mat-line>Nancy</h3>
      <p mat-line>
        <span>Oui oui</span>
        <span class="subline">-- Have you booked the Paris trip?</span>
      </p>
    </mat-list-item>
  </mat-list>
  `);

  threeLineListHTML: string = _.escape(`
  <mat-list class="demo-list mat-elevation-z2">
    <mat-list-item>
      <img mat-list-avatar src="assets/img/avatars/John.png">
      <h3 mat-line>John</h3>
      <p mat-line>Brunch?</p>
      <p mat-line class="subline">Did you want to go on Sunday? I was thinking</p>
    </mat-list-item>
    <mat-list-item>
      <img mat-list-avatar src="assets/img/avatars/Peter.png">
      <h3 mat-line>Peter</h3>
      <p mat-line>Summer BBQ</p>
      <p mat-line class="subline">Wish I could come, but I have some special</p>
    </mat-list-item>
    <mat-list-item>
      <img mat-list-avatar src="assets/img/avatars/Nancy.png">
      <h3 mat-line>Nancy</h3>
      <p mat-line>Oui oui</p>
      <p mat-line class="subline">Have you booked the Paris trip?</p>
    </mat-list-item>
  </mat-list>
  `);

  threeLineListWithoutAvatarsHTML: string = _.escape(`
  <mat-list class="demo-list mat-elevation-z2">
    <mat-list-item>
      <h3 mat-line>John</h3>
      <p mat-line>Brunch?</p>
      <p mat-line class="subline">Did you want to go on Sunday? I was thinking</p>
    </mat-list-item>
    <mat-list-item>
      <h3 mat-line>Peter</h3>
      <p mat-line>Summer BBQ</p>
      <p mat-line class="subline">Wish I could come, but I have some special</p>
    </mat-list-item>
    <mat-list-item>
      <h3 mat-line>Nancy</h3>
      <p mat-line>Oui oui</p>
      <p mat-line class="subline">Have you booked the Paris trip?</p>
    </mat-list-item>
  </mat-list>
  `);

  oneLineList: string = _.escape(`
  <mat-list class="demo-list mat-elevation-z2">
    <mat-list-item>
      <h3 mat-line>John</h3>
    </mat-list-item>
    <mat-list-item>
      <h3 mat-line>Peter</h3>
    </mat-list-item>
    <mat-list-item>
      <h3 mat-line>Nancy</h3>
    </mat-list-item>
  </mat-list>
  `);

  constructor() { }

  ngOnInit() {
  }

}
