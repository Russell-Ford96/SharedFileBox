import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'message-sent-snackbar',
  templateUrl: './snackbar.component.html',
})

export class SnackbarComponent implements OnInit{

  constructor(public snackBar: MatSnackBar){}

  ngOnInit(){
    this.openSnackBar();
  }

  openSnackBar(){
    this.snackBar.open('Message Sent!','',{
      duration: 4000,
    });
  }
}
