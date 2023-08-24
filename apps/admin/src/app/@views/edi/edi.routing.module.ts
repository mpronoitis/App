import { EdiConnectionDashboardComponent } from './edi-connection/edi-connection-dashboard/edi-connection-dashboard.component';
import { EdiDashboardComponent } from './edi-dashboard/edi-dashboard.component';
import { EdiModelDashboardComponent } from './edi-model/edi-model-dashboard/edi-model-dashboard.component';
import { EdiOrganizationDashboardComponent } from './edi-organization/edi-organization-dashboard/edi-organization-dashboard.component';
import { EdiSegmentDashboardComponent } from './edi-segment/edi-segment-dashboard/edi-segment-dashboard.component';
import { EdiVariableDashboardComponent } from './edi-variable/edi-variable-dashboard/edi-variable-dashboard.component';
import { EdiCreditDashboardComponent } from './edi-credit/edi-credit-dashboard/edi-credit-dashboard.component';

export const EDI_ROUTES = [
  {
    path: '',
    component: EdiDashboardComponent,
  },
  {
    path: 'connections',
    component: EdiConnectionDashboardComponent,
  },
  {
    path: 'models',
    component: EdiModelDashboardComponent,
  },
  {
    path: 'organizations',
    component: EdiOrganizationDashboardComponent,
  },
  {
    path: 'segments',
    component: EdiSegmentDashboardComponent,
  },
  {
    path: 'variables',
    component: EdiVariableDashboardComponent,
  },
  {
    path: 'credit',
    component: EdiCreditDashboardComponent,
  },

  {
    path: '**',
    redirectTo: '/edi',
  },
];
