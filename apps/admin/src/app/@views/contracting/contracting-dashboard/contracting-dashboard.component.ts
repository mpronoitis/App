import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateContractDialogComponent } from '../../../@dialogs/contracting/create-contract-dialog/create-contract-dialog.component';

@Component({
  selector: 'play-app-contracting-dashboard',
  templateUrl: './contracting-dashboard.component.html',
  styleUrls: ['./contracting-dashboard.component.scss'],
})
export class ContractingDashboardComponent {
  constructor(private dialog: MatDialog) {}

  /**
   * @summary open create contract dialog
   */
  openCreateContractDialog() {
    this.dialog.open(CreateContractDialogComponent, {
      width: '70%',
    });
  }
}
