import { InvoicingDashboardComponent } from './invoicing-dashboard/invoicing-dashboard.component';

export const INVOICING_ROUTES = [
  {
    path: '',
    component: InvoicingDashboardComponent,
  },
  {
    path: '**',
    redirectTo: 'invoices',
  },
];
