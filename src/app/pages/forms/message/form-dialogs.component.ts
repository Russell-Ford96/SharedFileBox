import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MessageComponent } from './message.component';
import { DialogDataService } from './dialog-data.service';

@Component({
  selector: 'formdialog',
  template: ``,
})

export class FormDialogsComponent implements OnInit{

    constructor(public dialog: MatDialog){}

    ngOnInit(){
      this.openDialog();
    }

    openDialog(): void{
      let dialogRef = this.dialog.open(DialogOverviewComponent, {
        width: '400px',
        height: '250px',
      });
    dialogRef.afterClosed().subscribe(result => {})
  }

}




@Component({
    selector: 'dialog-overview',
    templateUrl: 'dialog-overview.component.html',
    providers: [MessageComponent,]
})

export class DialogOverviewComponent {


  message: string;


  constructor(
     public dialogRef: MatDialogRef<DialogOverviewComponent>,
     @Inject(MAT_DIALOG_DATA) public data: any, private dialogDataService: DialogDataService) {}


     ngOnInit(){
       this.dialogDataService.currentMessage.subscribe(message => this.message = message)
     }

     onNoClick(): void {
        this.dialogRef.close();
    }
}
