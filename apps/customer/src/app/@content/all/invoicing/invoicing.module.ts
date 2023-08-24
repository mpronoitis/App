import { SharedModule } from '../../../@utils/shared.module';
import { RouterModule } from '@angular/router';
import { INVOICING_ROUTES } from './invoicing.routing.module';
import { InvoicingDashboardComponent } from './invoicing-dashboard/invoicing-dashboard.component';
import { InvoiceComponent } from './invoice/invoice.component';
import { NgModule } from '@angular/core';
import { InvoiceTableComponent } from './invoice-table/invoice-table.component';

@NgModule({
  declarations: [
    InvoicingDashboardComponent,
    InvoiceComponent,
    InvoiceTableComponent,
  ],
  imports: [SharedModule, RouterModule.forChild(INVOICING_ROUTES)],
})
export class InvoicingModule {}
