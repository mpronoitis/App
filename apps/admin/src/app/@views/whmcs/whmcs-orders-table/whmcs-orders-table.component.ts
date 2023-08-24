import { Component, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngxs/store';
import { WhmcsOrder } from '@play.app/types/Whmcs/WhmcsOrder';
import { GetWhmcsOrders } from '../../../@store/Actions/whmcs.action';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { faSync, faPlus } from '@fortawesome/free-solid-svg-icons';
import { MatDialog } from '@angular/material/dialog';
import { WhmcsAddOrderDialogComponent } from '../../../@dialogs/Whmcs/whmcs-add-order-dialog/whmcs-add-order-dialog.component';
import { WhmcsAcceptOrderDialogComponent } from '../../../@dialogs/Whmcs/whmcs-accept-order-dialog/whmcs-accept-order-dialog.component';

@Component({
  selector: 'play-app-whmcs-orders-table',
  templateUrl: './whmcs-orders-table.component.html',
  styleUrls: ['./whmcs-orders-table.component.scss'],
})
export class WhmcsOrdersTableComponent implements OnInit {
  orders: WhmcsOrder[] = [];
  loading = false;

  //table variables
  displayedColumns: string[] = [
    'ordernum',
    'name',
    'ammount',
    'date',
    'status',
  ];
  dataSource!: MatTableDataSource<WhmcsOrder>;
  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;
  @ViewChild(MatSort) sort: MatSort | null = null;
  //icons
  faSync = faSync;
  faPlus = faPlus;

  //eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor(private store: Store, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.fetchOrders();
  }

  /**
   * @summary Fetch data from the store
   */
  fetchOrders() {
    this.loading = true;
    const sub = this.store
      .dispatch(new GetWhmcsOrders({ limitstart: 0, limitnum: 100 }))
      .subscribe((res) => {
        this.orders = res.whmcs.orders;
        setTimeout(
          () => (this.dataSource = new MatTableDataSource(this.orders))
        );
        setTimeout(() => (this.dataSource.paginator = this.paginator));
        setTimeout(() => (this.dataSource.sort = this.sort));
        sub.unsubscribe();
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
   * @summary addNewOrder - display the add order dialog
   */
  addNewOrder() {
    this.dialog.open(WhmcsAddOrderDialogComponent, {
      width: '60%',
    });
  }

  /**
   * @summary AcceptOrder - display the accept order dialog
   */
  acceptOrder(order: WhmcsOrder) {
    const sub = this.dialog.open(WhmcsAcceptOrderDialogComponent, {
      width: '60%',
      data: order,
    });
    sub.afterClosed().subscribe((res) => {
      if (res) {
        this.fetchOrders();
      }
    });
  }
}
