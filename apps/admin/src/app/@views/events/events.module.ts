import { NgModule } from '@angular/core';
import { SharedModule } from '../../@utils/shared.module';
import { RouterModule } from '@angular/router';
import { EVENTS_ROUTES } from './events.routing.module';
import { EventsDashboardComponent } from './events-dashboard/events-dashboard.component';
import { EventsTableComponent } from './events-table/events-table.component';
import { EventDetailsDialogComponent } from '../../@dialogs/EventSourcing/event-details-dialog/event-details-dialog.component';

@NgModule({
  imports: [SharedModule, RouterModule.forChild(EVENTS_ROUTES)],
  declarations: [
    EventsDashboardComponent,
    EventsTableComponent,
    EventDetailsDialogComponent,
  ],
  exports: [],
})
export class EventsModule {}
