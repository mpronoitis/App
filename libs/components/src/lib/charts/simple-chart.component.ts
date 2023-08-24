import { Component, ElementRef, Input, ViewChild } from '@angular/core';

@Component({
  selector: 'play-components-simple-chart',
  template: `
    <ngx-charts-bar-vertical
      [results]="this.single"
      [view]="view"
      [gradient]="gradient"
      [scheme]="colorScheme!"
      [xAxis]="showXAxis"
      [yAxis]="showYAxis"
      [legend]="showLegend"
      [showXAxisLabel]="showXAxisLabel"
      [showYAxisLabel]="showYAxisLabel"
      [xAxisLabel]="xAxisName!"
      [yAxisLabel]="yAxisName!"
      (select)="onSelect($event)"
      (window:resize)="onResize($event, widthContainer!, heightContainer!)"
      [showGridLines]="showGridLines"
      [showDataLabel]="showDataLabel"
    >
    </ngx-charts-bar-vertical>
  `,
  styles: [
    `
      /** set .textDataLabel to larger font size on host element */
      ::ng-deep .textDataLabel {
        font-weight: bold;
        font-size: 15px !important;
      }
    `,
  ],
})
export class SimpleChartComponent {
  @Input() single?: any[]; //data of chart
  @Input() view!: [number, number];
  @ViewChild('containerRef') containerRef: any;
  // options for chart
  @Input() showXAxis = true;
  @Input() showYAxis = true;
  @Input() gradient = false;
  showLegend = false;
  @Input() showXAxisLabel = true;
  // xAxisLabel = 'Month';
  @Input() showYAxisLabel = true;
  // yAxisLabel = 'Documents';
  @Input() colorScheme?: any = {
    domain: [],
  };
  @Input() widthContainer?: number; //width of container that chart is in
  @Input() heightContainer?: number; //height of container that chart is in

  @Input()
  xAxisName?: string;
  @Input()
  yAxisName?: string;
  @Input()
  showGridLines = true;
  @Input()
  showDataLabel = true;

  constructor(private elementRef: ElementRef) {
    if (this.colorScheme.domain.length == 0) {
      //if no color scheme is provided, use default
      this.colorScheme = {
        domain: ['#01579B'],
      };
    }
  }

  onResize(event: any, widthContainer: number, heightContainer: number) {
    //if we pass width and height of container, we can use it to set the size of chart
    this.widthContainer && this.heightContainer
      ? (this.view = [widthContainer, heightContainer])
      : (this.view = [
          event.target.innerWidth / 1.15,
          event.target.innerHeight / 2,
        ]);
  }

  @Input() customColors = (value: any) => {
    //console.log(value);
    return '#01579B';
  };

  onSelect(event: any) {
    console.log(this.single);
  }
}
