import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';

@Component({
  selector: 'vr-components-card',
  templateUrl: './components-card.component.html'
})
export class ComponentsCardComponent implements OnInit {

  // noinspection TsLint
  card1HTML = _.escape(`
  <mat-card fxFlex="80%">
    <mat-card-header>
      <img mat-card-avatar="" src="assets/img/avatars/Avatar.png">
      <mat-card-subtitle>
        Yesterday
      </mat-card-subtitle>
      <mat-card-title>Gerald Morris</mat-card-title>
    </mat-card-header>
    <img mat-card-image src="assets/img/backgrounds/1.jpg">
    <mat-card-content>
      <p>Piqued favour stairs it enable exeter as seeing. Remainder met improving but engrossed sincerity age. Better but length gay denied abroad are. Attachment astonished to on appearance imprudence so collecting in excellence. Tiled way blind lived whose new. The for fully had she there leave merit enjoy forth. </p>
    </mat-card-content>
    <mat-divider></mat-divider>
    <mat-card-actions>
      <div fxLayout="row">
        <button mat-icon-button>
          <mat-icon>share</mat-icon>
        </button>
        <button mat-icon-button>
          <mat-icon>favorite</mat-icon>
        </button>
        <span fxFlex></span>
        <button mat-button>
          More Info
        </button>
        <button mat-button>
          Save as
        </button>
      </div>
    </mat-card-actions>
  </mat-card>
  `);

  card2HTML = _.escape(`
  <mat-card fxFlex="80%">
    <mat-card-title>Standard Card with Actions</mat-card-title>
    <mat-card-subtitle>Subtitle</mat-card-subtitle>
    <mat-card-content>
      <p>Old there any widow law rooms. Agreed but expect repair she nay sir silent person. Direction
        can dependent one bed situation attempted. His she are man their spite avoid. Her pretended
        fulfilled extremely education yet. Satisfied did one admitting incommode tolerably how are. </p>
    </mat-card-content>
    <mat-card-actions align="end">
      <button mat-button>Cancel</button>
      <button color="primary" mat-raised-button>Action</button>
    </mat-card-actions>
  </mat-card>
  `);

  card3HTML: string = _.escape(`
  <mat-card fxFlex="80%">
    <mat-card-title>Standard Card</mat-card-title>
    <mat-card-subtitle>Subtitle</mat-card-subtitle>
    <mat-card-content>
      <p>Do play they miss give so up. Words to up style of since world. We leaf to snug on no need. Way
        own uncommonly travelling now acceptance bed compliment solicitude. Dissimilar admiration so
        terminated no in contrasted it. Advantages entreaties mr he apartments do. Limits far yet turned
        highly repair parish talked six. Draw fond rank form nor the day eat. </p>
    </mat-card-content>
  </mat-card>
  `);

  constructor() { }

  ngOnInit() {
  }

}
