import { NgModule } from '@angular/core';
import { SharedModule } from '../../@utils/shared.module';
import { PylonDashboardComponent } from './pylon-dashboard/pylon-dashboard.component';
import { RouterModule } from '@angular/router';
import { PYLON_ROUTES } from './pylon.routing.module';
import { PylonSessionsTableComponent } from './pylon-sessions-table/pylon-sessions-table.component';
import { PylonContactsTableComponent } from './pylon-contacts-table/pylon-contacts-table.component';
import { PylonItemsTableComponent } from './pylon-items-table/pylon-items-table.component';

@NgModule({
  imports: [SharedModule, RouterModule.forChild(PYLON_ROUTES)],
  declarations: [
    PylonDashboardComponent,
    PylonSessionsTableComponent,
    PylonContactsTableComponent,
    PylonItemsTableComponent,
  ],
  exports: [],
})
export class PylonModule {}
