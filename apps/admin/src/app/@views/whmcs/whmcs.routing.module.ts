import { WhmcsDashboardComponent } from './whmcs-dashboard/whmcs-dashboard.component';

export const WHMCS_ROUTES = [
  {
    path: '',
    component: WhmcsDashboardComponent,
  },
  {
    path: '**',
    redirectTo: '',
  },
];
