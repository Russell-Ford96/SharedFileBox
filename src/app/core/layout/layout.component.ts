import {
  AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit,
  ViewChild
} from '@angular/core';
import * as fromRoot from '../../reducers/index';
import * as layout from './shared/layout.action';
import { Store } from '@ngrx/store';
import { NavigationEnd, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { MediaReplayService } from '../utils/media-replay.service';
import { MediaChange } from '@angular/flex-layout';
import Scrollbar from 'smooth-scrollbar';
import { ScrollbarComponent } from '../scrollbar/scrollbar.component';
import * as hopscotch from 'hopscotch';

@Component({
  selector: 'vr-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LayoutComponent implements OnInit, AfterViewInit, OnDestroy {

  scrollbar: Scrollbar;

  layout = 'alpha'; // Layout

  sidenavOpen$: Observable<boolean>;
  sidenavCollapsed$: Observable<boolean>;
  sidenavAlign$: Observable<string>;
  sidenavMode$: Observable<string>;
  sidenavDisableClose$: Observable<boolean>;

  quickpanelOpen$: Observable<boolean>;
  quickpanelAlign = 'end';
  quickpanelMode = 'over';

  layoutBoxed$: Observable<boolean>;

  settingsOpen$: Observable<boolean>;

  isMobile: boolean;

  cardElevation$: Observable<string>;

  @ViewChild('scrollContainer')
  scrollContainer: ScrollbarComponent;

  buyNowToolbarVisible = true;

  private _mediaSubscription: Subscription;
  private _routerEventsSubscription: Subscription;

  constructor(
    private mediaReplayService: MediaReplayService,
    private router: Router,
    private store: Store<fromRoot.State>,
    private cd: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.sidenavOpen$ = this.store.select(fromRoot.getSidenavOpen);
    this.sidenavCollapsed$ = this.store.select(fromRoot.getSidenavCollapsed);
    this.sidenavAlign$ = this.store.select(fromRoot.getSidenavAlign);
    this.sidenavMode$ = this.store.select(fromRoot.getSidenavMode);
    this.sidenavDisableClose$ = this.store.select(fromRoot.getSidenavDisableClose);
    this.quickpanelOpen$ = this.store.select(fromRoot.getQuickpanelOpen);
    this.layoutBoxed$ = this.store.select(fromRoot.getLayoutBoxed);
    this.settingsOpen$ = this.store.select(fromRoot.getSettingsOpen);
    this.cardElevation$ = this.store.select(fromRoot.getCardElevation);

    // Layout
    this.store.select(fromRoot.getLayout).subscribe((layout) => {
      this.layout = layout;
      this.cd.markForCheck();
    });
    // /Layout

    this._mediaSubscription = this.mediaReplayService.media$.subscribe((change: MediaChange) => {
      const isMobile = (change.mqAlias === 'xs') || (change.mqAlias === 'sm');

      this.isMobile = isMobile;
      this.cd.markForCheck();

      if (isMobile || this.layout === 'gamma') {
        this.closeSidenav();
        this.setSidenavMode('over');
        this.setSidenavDisableClose(false);
      } else {
        this.openSidenav();
        this.setSidenavMode('side');
        this.setSidenavDisableClose(true);
      }
    });

    this._routerEventsSubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        if (this.isMobile) {
          this.closeSidenav();
        }
      }
    });
  }

  ngAfterViewInit() {
    this.scrollbar = Scrollbar.get(this.scrollContainer.element.nativeElement);
  }

  openSidenav() {
    this.store.dispatch(new layout.OpenSidenavAction());
  }

  closeSidenav() {
    this.store.dispatch(new layout.CloseSidenavAction());
  }

  toggleSidenav() {
    this.store.dispatch(new layout.ToggleSidenavAction());
  }

  toggleSidenavCollapse() {
    this.store.dispatch(new layout.ToggleSidenavCollapseAction());
  }

  setSidenavMode(mode: string) {
    this.store.dispatch(new layout.SetSidenavModeAction(mode));
  }

  setSidenavDisableClose(value: boolean) {
    this.store.dispatch(new layout.SetSidenavDisableCloseAction(value));
  }

  openQuickpanel() {
    this.store.dispatch(new layout.OpenQuickpanelAction());
  }

  closeQuickpanel() {
    this.store.dispatch(new layout.CloseQuickpanelAction());
  }

  toggleQuickpanel() {
    this.store.dispatch(new layout.ToggleQuickpanelAction());
  }

  openSettings() {
    this.store.dispatch(new layout.OpenSettingsAction());
  }

  closeSettings() {
    this.store.dispatch(new layout.CloseSettingsAction());
  }

  toggleSettings() {
    this.store.dispatch(new layout.ToggleSettingsAction());
    console.log("************************************** toggleSettings");
    try {
      hopscotch.nextStep();
    } catch (error) { }
  }

  onActivate(): void {
    if (this.scrollbar) {
      this.scrollbar.setPosition(0, 0);
    } else if (this.scrollContainer && this.scrollContainer.element) {
      this.scrollbar = Scrollbar.get(this.scrollContainer.element.nativeElement);
      this.scrollbar.setPosition(0, 0);
    }
  }

  ngOnDestroy() {
    this._mediaSubscription.unsubscribe();
    this._routerEventsSubscription.unsubscribe();
  }
}
