import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import Chart from 'chart.js';
import { salesWidgetData } from './sales-widget.data';

@Component({
  selector: 'vr-sales-widget',
  templateUrl: './sales-widget.component.html',
  styleUrls: ['./sales-widget.component.scss']
})
export class SalesWidgetComponent implements OnInit {

  @ViewChild('canvas') canvas: ElementRef;

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    const ctx = this.canvas.nativeElement.getContext('2d');

    new Chart(ctx, {
      type: 'line',
      data: salesWidgetData,
      options: {
        responsive: true,
        scales: {
          xAxes: [{
            display: false,
            stacked: true,
            gridLines: {
              color: '#F7F7F7'
            }
          }],
          yAxes: [{
            display: false,
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
        elements: {
          point: {
            radius: 0
          }
        }
      }
    });
  }

}
