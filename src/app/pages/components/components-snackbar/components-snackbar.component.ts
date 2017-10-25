import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';
import { MdSnackBar } from '@angular/material';

@Component({
  selector: 'vr-components-snackbar',
  templateUrl: './components-snackbar.component.html'
})
export class ComponentsSnackbarComponent implements OnInit {

  snackbarHTML: string = _.escape(`<button md-button (click)="openSnackbar()">Trigger Snackbar</button>`);
  snackbarTS: string = _.escape(
`this.snackBar.open(
  'I\'m a notification!',
  'Close', {
  duration: 3000
});`);

  constructor(
    private snackBar: MdSnackBar
  ) { }

  ngOnInit() {
  }

  openSnackbar() {
    this.snackBar.open('I\'m a notification!', 'Close', {
      duration: 3000
    });
  }

}
