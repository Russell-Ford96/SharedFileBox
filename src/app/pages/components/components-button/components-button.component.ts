import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';

@Component({
  selector: 'vr-components-button',
  templateUrl: './components-button.component.html'
})
export class ComponentsButtonComponent implements OnInit {

  flatButtonsHTML: string = _.escape(`
  <mat-card>
    <mat-card-content fxLayout="column" fxLayout.gt-sm="row" fxLayoutAlign="space-around center">
      <button mat-button>Button</button>
      <button mat-button color="primary">Primary</button>
      <button mat-button color="accent">Accent</button>
      <button mat-button color="warn">Warn</button>
      <button mat-button disabled="true">Disabled</button>
    </mat-card-content>
  </mat-card>
  `);

  raisedButtonsHTML: string = _.escape(`
  <mat-card>
    <mat-card-content fxLayout="column" fxLayout.gt-sm="row" fxLayoutAlign="space-around center">
      <button mat-raised-button>Button</button>
      <button mat-raised-button color="primary">Primary</button>
      <button mat-raised-button color="accent">Accent</button>
      <button mat-raised-button color="warn">Warn</button>
      <button mat-raised-button disabled="true">Disabled</button>
    </mat-card-content>
  </mat-card>
  `);

  fabHTML: string = _.escape(`
  <mat-card>
    <mat-card-content fxLayout="column" fxLayout.gt-sm="row" fxLayoutAlign="space-around center">
      <button mat-fab color="primary"><mat-icon>grade</mat-icon></button>
      <button mat-fab color="accent"><mat-icon>favorite</mat-icon></button>
      <button mat-fab color="warn"><mat-icon>build</mat-icon></button>
      <button mat-fab disabled="true"><mat-icon>lock</mat-icon></button>
      <button mat-mini-fab color="primary"><mat-icon>favorite</mat-icon></button>
      <button mat-mini-fab color="accent"><mat-icon>thumb_up</mat-icon></button>
      <button mat-mini-fab color="warn"><mat-icon>build</mat-icon></button>
      <button mat-mini-fab disabled="true"><mat-icon>lock</mat-icon></button>
    </mat-card-content>
  </mat-card>
  `);

  buttonToggleHTML: string = _.escape(`
  <mat-card>
    <mat-card-content fxLayout="column" fxLayout.gt-sm="row" fxLayoutAlign="space-around center">
      <mat-button-toggle-group [name]="'alignment'">
        <mat-button-toggle value="left"><mat-icon>format_align_left</mat-icon></mat-button-toggle>
        <mat-button-toggle value="center"><mat-icon>format_align_center</mat-icon></mat-button-toggle>
        <mat-button-toggle value="right"><mat-icon>format_align_right</mat-icon></mat-button-toggle>
        <mat-button-toggle value="justify"><mat-icon>format_align_justify</mat-icon></mat-button-toggle>
      </mat-button-toggle-group>
      <mat-button-toggle-group multiple>
        <mat-button-toggle>Flour</mat-button-toggle>
        <mat-button-toggle>Eggs</mat-button-toggle>
        <mat-button-toggle>Sugar</mat-button-toggle>
        <mat-button-toggle>Milk</mat-button-toggle>
      </mat-button-toggle-group>
    </mat-card-content>
  </mat-card>
  `);

  iconButtonHTML: string = _.escape(`
  <mat-card>
    <mat-card-content fxLayout="column" fxLayout.gt-sm="row" fxLayoutAlign="space-around center">
      <button mat-icon-button><mat-icon>menu</mat-icon></button>
      <button mat-icon-button color="primary"><mat-icon>grade</mat-icon></button>
      <button mat-icon-button color="accent"><mat-icon>favorite</mat-icon></button>
      <button mat-icon-button color="warn"><mat-icon>build</mat-icon></button>
      <button mat-icon-button disabled="true"><mat-icon>lock</mat-icon></button>
    </mat-card-content>
  </mat-card>
  `);

  constructor() { }

  ngOnInit() {
  }

}
