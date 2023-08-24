import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SimpleAlertComponent } from './simple-alert/simple-alert.component';
import { SimpleSpinnerComponent } from './simple-spinner/simple-spinner.component';
import { SimpleBadgeComponent } from './simple-badge/simple-badge.component';
import { SimpleButtonComponent } from './simple-button/simple-button.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { SimpleChartComponent } from './charts/simple-chart.component';
import { SimpleLineChartComponent } from './charts/simple-line-chart.component';

@NgModule({
  imports: [CommonModule, FontAwesomeModule, NgxChartsModule],
  declarations: [
    SimpleAlertComponent,
    SimpleSpinnerComponent,
    SimpleBadgeComponent,
    SimpleButtonComponent,
    SimpleChartComponent,
    SimpleLineChartComponent,
    SimpleLineChartComponent,
  ],
  exports: [
    SimpleAlertComponent,
    SimpleSpinnerComponent,
    SimpleBadgeComponent,
    SimpleButtonComponent,
    SimpleChartComponent,
    SimpleLineChartComponent,
  ],
})
export class ComponentsModule {}
