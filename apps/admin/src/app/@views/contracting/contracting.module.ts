import { NgModule } from '@angular/core';
import { SharedModule } from '../../@utils/shared.module';
import { ContractingDashboardComponent } from './contracting-dashboard/contracting-dashboard.component';
import { RouterModule } from '@angular/router';
import { CONTRACTING_ROUTES } from '../contracting.routing.module';
import { CreateContractDialogComponent } from '../../@dialogs/contracting/create-contract-dialog/create-contract-dialog.component';

@NgModule({
  imports: [SharedModule, RouterModule.forChild(CONTRACTING_ROUTES)],
  declarations: [ContractingDashboardComponent, CreateContractDialogComponent],
  exports: [],
})
export class ContractingModule {}
