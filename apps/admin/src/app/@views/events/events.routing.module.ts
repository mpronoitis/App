import { EventsDashboardComponent } from './events-dashboard/events-dashboard.component';

export const EVENTS_ROUTES = [
  {
    path: '',
    component: EventsDashboardComponent,
  },
  {
    path: '**',
    redirectTo: '/events',
  },
];
