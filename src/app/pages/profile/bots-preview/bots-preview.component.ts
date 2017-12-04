import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material';
import Scrollbar from 'smooth-scrollbar';

import { Bot } from '../bot.model';



@Component({
  selector: 'vr-bots-preview',
  templateUrl: './bots-preview.component.html',
  styleUrls: ['./bots-preview.component.scss']
})
export class BotsPreviewComponent implements OnInit {
  @Input() bot: Bot;
  @Output() closePreview = new EventEmitter<boolean>();

  private reloadSimulator: boolean;

  constructor() {
    this.reloadSimulator = false;

  }

  isNewBot(){
    return this.bot._id == '';
  }

  isFile(file){
    var value: string;
    console.log(file);
    if(file){
      value = "accent";
    }else{
      value = "void";
    }
      console.log(value);
    return value
  }

  setLabelNewOrEdit(){
    return this.bot._id == '' ? 'New ' : 'Edit ';
  }

  ngOnInit() {
    Scrollbar.initAll();

  }

  private onClose(){
    this.closePreview.emit(true);
  }

  private onBotChange(b:Bot){
    console.log("this is a onBotChange()");
    console.log(b);
    this.bot = b;
    this.reloadSimulator = true;
    console.log(this.bot);
    return this.bot;
  }

}
