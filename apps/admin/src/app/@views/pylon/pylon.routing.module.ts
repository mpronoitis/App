import { PylonDashboardComponent } from './pylon-dashboard/pylon-dashboard.component';

export const PYLON_ROUTES = [
  {
    path: '',
    component: PylonDashboardComponent,
  },
  {
    path: '**',
    redirectTo: '/pylon',
  },
];
