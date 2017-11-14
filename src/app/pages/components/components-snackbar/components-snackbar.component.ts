import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'vr-components-snackbar',
  templateUrl: './components-snackbar.component.html'
})
export class ComponentsSnackbarComponent implements OnInit {

  snackbarHTML: string = _.escape(`<button mat-button (click)="openSnackbar()">Trigger Snackbar</button>`);
  snackbarTS: string = _.escape(
`this.snackBar.open(
  'I\'m a notification!',
  'Close', {
  duration: 3000
});`);

  constructor(
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
  }

  openSnackbar() {
    this.snackBar.open('I\'m a notification!', 'Close', {
      duration: 3000
    });
  }

}
