import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';

@Component({
  selector: 'vr-components-menu',
  templateUrl: './components-menu.component.html'
})
export class ComponentsMenuComponent implements OnInit {

  menuHTML = _.escape(`
  <button mat-icon-button [matMenuTriggerFor]="menu">
    <mat-icon>more_vert</mat-icon>
  </button>
  <mat-menu #menu="matMenu">
    <button mat-menu-item>
      <mat-icon> dialpad </mat-icon>
      <span> Redial </span>
    </button>
    <button mat-menu-item disabled>
      <mat-icon> voicemail </mat-icon>
      <span> Check voicemail </span>
    </button>
    <button mat-menu-item>
      <mat-icon> notifications_off </mat-icon>
      <span> Disable alerts </span>
    </button>
  </mat-menu>
  `);

  constructor() { }

  ngOnInit() {
  }

}
