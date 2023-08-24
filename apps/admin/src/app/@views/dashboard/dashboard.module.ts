import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NavModule } from '../../@nav/nav.module';
import { SharedModule } from '../../@utils/shared.module';
import { EdiDashboardComponent } from '../edi/edi-dashboard/edi-dashboard.component';
import { DashboardComponent } from './dashboard.component';
import { DASHBOARD_ROUTES } from './dashboard.routing.module';
import { UserAddComponent } from '../user/user-add/user-add.component';

@NgModule({
  declarations: [DashboardComponent, EdiDashboardComponent],
  imports: [
    SharedModule,
    RouterModule.forChild(DASHBOARD_ROUTES),
    NavModule,
    FontAwesomeModule,
  ],
})
export class DashboardModule {}
