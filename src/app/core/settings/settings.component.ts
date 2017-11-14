import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../reducers/index';
import * as layout from '../layout/shared/layout.action';
import { MatRadioChange, MatSelectChange } from '@angular/material';

@Component({
  selector: 'vr-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  cardElevation = 'card-elevation-z4'; // default value also change in layout.reducer.ts

  constructor(
    private store: Store<fromRoot.State>
  ) { }

  ngOnInit() {
  }

  setLayout(radioEvent: MatRadioChange) {
    this.store.dispatch(new layout.SelectLayoutAction(radioEvent.value));
  }

  setCardElevation(selectEvent: MatSelectChange) {
    this.store.dispatch(new layout.SetCardElevationAction(selectEvent.value));
  }
}
