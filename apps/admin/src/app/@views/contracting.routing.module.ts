import { ContractingDashboardComponent } from './contracting/contracting-dashboard/contracting-dashboard.component';

export const CONTRACTING_ROUTES = [
  {
    path: '',
    component: ContractingDashboardComponent,
  },
  {
    path: '**',
    redirectTo: '',
  },
];
