import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'message-sent-snackbar',
  template: ``,
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

@Component({
  selector:'message-send-snack',
  template:``,
  styles: [``],
})
export class MessageSentSnack{}
