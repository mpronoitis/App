import { NgModule } from '@angular/core';

import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SharedModule } from '../../@utils/shared.module';
import { EdiConnectionAddComponent } from './edi-connection/edi-connection-add/edi-connection-add.component';
import { EdiConnectionDashboardComponent } from './edi-connection/edi-connection-dashboard/edi-connection-dashboard.component';
import { EdiConnectionDeleteComponent } from './edi-connection/edi-connection-delete/edi-connection-delete.component';
import { EdiConnectionTableComponent } from './edi-connection/edi-connection-table/edi-connection-table.component';
import { EdiConnectionUpdateComponent } from './edi-connection/edi-connection-update/edi-connection-update.component';
import { EdiModelAddComponent } from './edi-model/edi-model-add/edi-model-add.component';
import { EdiModelDashboardComponent } from './edi-model/edi-model-dashboard/edi-model-dashboard.component';
import { EdiModelDeleteComponent } from './edi-model/edi-model-delete/edi-model-delete.component';
import { EdiModelTableComponent } from './edi-model/edi-model-table/edi-model-table.component';
import { EdiModelUpdateComponent } from './edi-model/edi-model-update/edi-model-update.component';
import { EdiOrganizationAddComponent } from './edi-organization/edi-organization-add/edi-organization-add.component';
import { EdiOrganizationDashboardComponent } from './edi-organization/edi-organization-dashboard/edi-organization-dashboard.component';
import { EdiOrganizationDeleteComponent } from './edi-organization/edi-organization-delete/edi-organization-delete.component';
import { EdiOrganizationTableComponent } from './edi-organization/edi-organization-table/edi-organization-table.component';
import { EdiOrganizationUpdateComponent } from './edi-organization/edi-organization-update/edi-organization-update.component';
import { EdiSegmentDashboardComponent } from './edi-segment/edi-segment-dashboard/edi-segment-dashboard.component';
import { EdiSegmentAddComponent } from './edi-segment/edi-segment-add/edi-segment-add.component';
import { EdiSegmentDeleteComponent } from './edi-segment/edi-segment-delete/edi-segment-delete.component';
import { EdiSegmentTableComponent } from './edi-segment/edi-segment-table/edi-segment-table.component';
import { EdiSegmentUpdateComponent } from './edi-segment/edi-segment-update/edi-segment-update.component';
import { EdiVariableDashboardComponent } from './edi-variable/edi-variable-dashboard/edi-variable-dashboard.component';
import { EDI_ROUTES } from './edi.routing.module';
import { EdiVariableAddComponent } from './edi-variable/edi-variable-add/edi-variable-add.component';
import { EdiVariableDeleteComponent } from './edi-variable/edi-variable-delete/edi-variable-delete.component';
import { EdiVariableUpdateComponent } from './edi-variable/edi-variable-update/edi-variable-update.component';
import { EdiVariableTableComponent } from './edi-variable/edi-variable-table/edi-variable-table.component';
import { EdiCreditDashboardComponent } from './edi-credit/edi-credit-dashboard/edi-credit-dashboard.component';
import { EdiCreditAddComponent } from './edi-credit/edi-credit-add/edi-credit-add.component';
import { EdiCreditTableComponent } from './edi-credit/edi-credit-table/edi-credit-table.component';
import { EdiCreditUpdateComponent } from './edi-credit/edi-credit-update/edi-credit-update.component';
import { EdiCreditDeleteComponent } from './edi-credit/edi-credit-delete/edi-credit-delete.component';
import { EdiCreditDetailsDialogComponent } from '../../@dialogs/Edi/edi-credit-details-dialog/edi-credit-details-dialog.component';
@NgModule({
  declarations: [
    EdiConnectionDashboardComponent,
    EdiOrganizationDashboardComponent,
    EdiSegmentDashboardComponent,
    EdiVariableDashboardComponent,
    EdiModelDashboardComponent,
    EdiModelTableComponent,
    EdiModelAddComponent,
    EdiModelUpdateComponent,
    EdiModelDeleteComponent,
    EdiConnectionTableComponent,
    EdiConnectionAddComponent,
    EdiConnectionUpdateComponent,
    EdiConnectionDeleteComponent,
    EdiOrganizationTableComponent,
    EdiOrganizationAddComponent,
    EdiOrganizationUpdateComponent,
    EdiOrganizationDeleteComponent,
    EdiSegmentAddComponent,
    EdiSegmentDeleteComponent,
    EdiSegmentUpdateComponent,
    EdiSegmentTableComponent,
    EdiVariableAddComponent,
    EdiVariableDeleteComponent,
    EdiVariableUpdateComponent,
    EdiVariableTableComponent,
    EdiCreditDashboardComponent,
    EdiCreditAddComponent,
    EdiCreditTableComponent,
    EdiCreditUpdateComponent,
    EdiCreditDeleteComponent,
    EdiCreditDetailsDialogComponent,
  ],
  imports: [SharedModule, RouterModule.forChild(EDI_ROUTES), FontAwesomeModule],
})
export class EdiModule {}
