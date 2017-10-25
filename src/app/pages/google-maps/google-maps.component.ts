import { Component, OnInit } from '@angular/core';
import { ROUTE_TRANSITION } from '../../app.animation';

@Component({
  selector: 'vr-google-maps',
  templateUrl: './google-maps.component.html',
  styleUrls: ['./google-maps.component.scss'],
  animations: [...ROUTE_TRANSITION],
  host: { '[@routeTransition]': '' }
})
export class GoogleMapsComponent implements OnInit {

  lat = 40.7143528;
  lng = -74.0059731;
  zoom = 10;

  constructor() { }

  ngOnInit() {
  }

}
