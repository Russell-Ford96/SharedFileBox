import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import Chart from 'chart.js';
import { barchartWidgetData } from './barchart-widget.data';

@Component({
  selector: 'vr-barchart-widget',
  templateUrl: './barchart-widget.component.html',
  styleUrls: ['./barchart-widget.component.scss']
})
export class BarchartWidgetComponent implements OnInit, AfterViewInit {

  @ViewChild('canvas') canvas: ElementRef;

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    const ctx = this.canvas.nativeElement.getContext('2d');

    new Chart(ctx, {
      type: 'bar',
      data: barchartWidgetData,
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
        }
      }
    });
  }

}
