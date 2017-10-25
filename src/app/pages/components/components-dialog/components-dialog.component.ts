import { Component } from '@angular/core';
import { MdDialog, MdDialogRef } from '@angular/material';
import * as _ from 'lodash';

@Component({
  selector: 'vr-components-dialog',
  templateUrl: './components-dialog.component.html'
})
export class ComponentsDialogComponent {

  dialogRef: MdDialogRef<ComponentsDialogDemoDialogComponent>;
  result: string;

  dialogHTML: string = _.escape(`
  <button md-raised-button type="button" (click)="openDialog()" color="primary">Open Dialog</button>
  <p *ngIf="result">You chose: {{ result }}</p>
  `);

  constructor(public dialog: MdDialog) { }

  openDialog() {
    this.dialogRef = this.dialog.open(ComponentsDialogDemoDialogComponent, {
      disableClose: false
    });

    this.dialogRef.afterClosed().subscribe(result => {
      this.result = result;
      this.dialogRef = null;
    });
  }

}

@Component({
  selector: 'vr-component-dialog-demo-dialog',
  template: `
  <h1>Would you like to order pizza?</h1>
  <md-dialog-actions align="end">
    <button md-button (click)="dialogRef.close('No!')">No</button>
    <button md-button color="primary" (click)="dialogRef.close('Yes!')">Yes</button>
  </md-dialog-actions>
  `
})
export class ComponentsDialogDemoDialogComponent {
  constructor(public dialogRef: MdDialogRef<ComponentsDialogDemoDialogComponent>) { }
}
