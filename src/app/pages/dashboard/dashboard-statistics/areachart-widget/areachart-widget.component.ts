import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import Chart from 'chart.js';
import { areachartWidgetData } from './areachart-widget.data';

@Component({
  selector: 'vr-areachart-widget',
  templateUrl: './areachart-widget.component.html',
  styleUrls: ['./areachart-widget.component.scss']
})
export class AreachartWidgetComponent implements OnInit, AfterViewInit {

  @ViewChild('canvas') canvas: ElementRef;

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    const ctx = this.canvas.nativeElement.getContext('2d');

    new Chart(ctx, {
      type: 'line',
      data: areachartWidgetData,
      options: {
        responsive: true,
        scales: {
          xAxes: [{
            stacked: true,
            gridLines: {
              color: '#F7F7F7'
            }
          }],
          yAxes: [{
            stacked: true,
            gridLines: {
              color: '#F7F7F7'
            },
          }]
        },
        legend: {
          display: false
        },
        tooltips: {
          mode: 'index',
          intersect: false
        },
      }
    });
  }

}
