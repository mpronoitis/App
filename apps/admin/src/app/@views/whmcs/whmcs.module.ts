import { NgModule } from '@angular/core';
import { WhmcsDashboardComponent } from './whmcs-dashboard/whmcs-dashboard.component';
import { SharedModule } from '../../@utils/shared.module';
import { RouterModule } from '@angular/router';
import { WHMCS_ROUTES } from './whmcs.routing.module';
import { WhmcsClientsTableComponent } from './whmcs-clients-table/whmcs-clients-table.component';
import { WhmcsOrdersTableComponent } from './whmcs-orders-table/whmcs-orders-table.component';
import { WhmcsAddClientDialogComponent } from '../../@dialogs/Whmcs/whmcs-add-client-dialog/whmcs-add-client-dialog.component';
import { WhmcsClientDetailsDialogComponent } from '../../@dialogs/Whmcs/whmcs-client-details-modal/whmcs-client-details-dialog.component';
import { WhmcsProductsTableComponent } from './whmcs-products-table/whmcs-products-table.component';
import { WhmcsAddOrderDialogComponent } from '../../@dialogs/Whmcs/whmcs-add-order-dialog/whmcs-add-order-dialog.component';
import { WhmcsAcceptOrderDialogComponent } from '../../@dialogs/Whmcs/whmcs-accept-order-dialog/whmcs-accept-order-dialog.component';

@NgModule({
  imports: [SharedModule, RouterModule.forChild(WHMCS_ROUTES)],
  declarations: [
    WhmcsDashboardComponent,
    WhmcsClientsTableComponent,
    WhmcsOrdersTableComponent,
    WhmcsAddClientDialogComponent,
    WhmcsClientDetailsDialogComponent,
    WhmcsProductsTableComponent,
    WhmcsAddOrderDialogComponent,
    WhmcsAcceptOrderDialogComponent,
  ],
})
export class WhmcsModule {}
