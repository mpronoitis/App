import { Component, Input, ViewChild } from '@angular/core';

@Component({
  selector: 'play-components-simple-line-chart',
  template: ` <ngx-charts-line-chart
    [view]="view"
    [results]="this.single"
    [xAxis]="showXAxis"
    [yAxis]="showYAxis"
    [legend]="showLegend"
    [showXAxisLabel]="showXAxisLabel"
    [showYAxisLabel]="showYAxisLabel"
    [customColors]="customColors"
    [xAxisLabel]="xAxisName!"
    [animations]="true"
    [showGridLines]="true"
    [yAxisLabel]="yAxisName!"
    (select)="onSelect($event)"
    (window:resize)="onResize($event)"
  >
  </ngx-charts-line-chart>`,
  styles: [],
})
export class SimpleLineChartComponent {
  @Input() single?: any[]; //data of chart
  @Input() view!: [number, number];
  @ViewChild('containerRef') containerRef: any;
  @Input()
  xAxisName?: string;
  @Input()
  yAxisName?: string;
  // options for chart
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = false;
  showXAxisLabel = true;
  // xAxisLabel = 'Month';
  showYAxisLabel = true;
  // yAxisLabel = 'Documents';
  colorScheme = {
    domain: ['#C600FF'],
  };

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}

  onResize(event: any) {
    this.view = [event.target.innerWidth / 1.25, event.target.innerHeight / 2];
  }

  customColors = (value: any) => {
    //console.log(value);
    return '#01579B';
  };

  onSelect(event: any) {
    console.log(this.single);
  }
}
