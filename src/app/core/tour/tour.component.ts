import { AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../reducers/index';
import * as layout from '../layout/shared/layout.action';
import { Subscription } from 'rxjs/Subscription';
import { MediaChange } from '@angular/flex-layout';
import { MediaReplayService } from '../utils/media-replay.service';
import * as hopscotch from 'hopscotch';

@Component({
  template: `<ng-content></ng-content>`,
  selector: 'vr-tour'
})
export class TourComponent implements OnInit, AfterViewInit, OnDestroy {

  layout = 'alpha';
  isMobile: boolean;
  _mediaSubscription: Subscription;

  constructor(
    private store: Store<fromRoot.State>,
    private cd: ChangeDetectorRef,
    private mediaReplayService: MediaReplayService
  ) { }

  ngOnInit() {
    this.store.select(fromRoot.getLayout).subscribe((layout) => {
      this.layout = layout;
      this.cd.markForCheck();
    });

    this._mediaSubscription = this.mediaReplayService.media$.subscribe((change: MediaChange) => {
      this.isMobile = (change.mqAlias === 'xs');
    });
  }

  ngAfterViewInit() {

    // noinspection JSUnusedGlobalSymbols
    const tour = {
      id: 'tour',
      nextOnTargetClick: true,
      onEnd: () => {
        this.store.dispatch(new layout.CloseSettingsAction());
      },
      onClose: () => {
        this.store.dispatch(new layout.CloseSettingsAction());
      },
      steps: [
        {
          title: 'Settings',
          content: 'This is the settings sidebar. You can click here to customize the look of the template.',
          target: 'settings',
          placement: 'left'
        },
        {
          title: 'Layouts',
          content: 'elastic ui features a variety of different layouts, to make sure you can customize it the way you want. ' +
          'You can choose one or stay at the default one.',
          target: 'settings-layouts',
          placement: 'left',
          delay: 1,
          xOffset: -250,
          yOffset: 20,
          onShow: () => {
            this.store.dispatch(new layout.OpenSettingsAction());
          }
        }
      ]
    };

    if (!this.isMobile) {
      hopscotch.startTour(tour);
    }
  }

  ngOnDestroy() {
    this._mediaSubscription.unsubscribe();
  }

}
