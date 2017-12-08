import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'vr-sent-detail',
  templateUrl: './sent-detail.component.html',
  styleUrls: ['./sent-detail.component.scss']
})
export class SentDetailComponent implements OnInit {
  @Input() activeMsg: any;
  @Output() closeDetailds = new EventEmitter<boolean>();
  constructor() { }

  ngOnInit() {
  }

  onClose(){
    this.closeDetailds.emit(false);
  }

}
