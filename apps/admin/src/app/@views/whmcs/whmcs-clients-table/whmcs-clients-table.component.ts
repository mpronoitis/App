import { Component, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngxs/store';
import { WhmcsClient } from '@play.app/types/Whmcs/WhmcsClient';
import { GetWhmcsClients } from '../../../@store/Actions/whmcs.action';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { faSync, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { WhmcsAddClientDialogComponent } from '../../../@dialogs/Whmcs/whmcs-add-client-dialog/whmcs-add-client-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { WhmcsClientDetailsDialogComponent } from '../../../@dialogs/Whmcs/whmcs-client-details-modal/whmcs-client-details-dialog.component';

@Component({
  selector: 'play-app-whmcs-clients-table',
  templateUrl: './whmcs-clients-table.component.html',
  styleUrls: ['./whmcs-clients-table.component.scss'],
})
export class WhmcsClientsTableComponent implements OnInit {
  loading = false;
  clients: WhmcsClient[] = [];

  //table variables
  displayedColumns: string[] = [
    'avatar',
    'firstname',
    'lastname',
    'email',
    'companyname',
    'datecreated',
  ];
  dataSource!: MatTableDataSource<WhmcsClient>;
  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;
  @ViewChild(MatSort) sort: MatSort | null = null;

  //icons
  faSync = faSync;
  faUserPlus = faUserPlus;

  //eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor(private store: Store, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.fetchClients();
  }

  /**
   * @summary fetch data
   */
  fetchClients() {
    this.loading = true;
    this.store
      .dispatch(new GetWhmcsClients({ limitstart: 0, limitnum: 200 }))
      .subscribe((res) => {
        this.clients = res.whmcs.clients;
        setTimeout(
          () => (this.dataSource = new MatTableDataSource(this.clients))
        );
        setTimeout(() => (this.dataSource.paginator = this.paginator));
        setTimeout(() => (this.dataSource.sort = this.sort));

        this.loading = false;
      });
  }

  /**
   * @summary Filter table
   */
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  /**
   * @summary Display a dialog for creating a new client
   */
  showCreateClient() {
    this.dialog.open(WhmcsAddClientDialogComponent, {
      width: '40%',
    });
  }

  /**
   * @summary Display a dialog for client details
   * @param client
   */
  showClientDetails(client: WhmcsClient) {
    this.dialog.open(WhmcsClientDetailsDialogComponent, {
      width: '80%',
      data: client,
    });
  }
}
