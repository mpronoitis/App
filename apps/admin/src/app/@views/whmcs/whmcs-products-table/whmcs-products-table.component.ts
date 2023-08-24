import { Component, OnInit, ViewChild } from '@angular/core';
import { WhmcsProduct } from '@play.app/types/Whmcs/WhmcsProduct';
import { faSync } from '@fortawesome/free-solid-svg-icons';
import { MatTableDataSource } from '@angular/material/table';
import { WhmcsOrder } from '@play.app/types/Whmcs/WhmcsOrder';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Store } from '@ngxs/store';
import {
  GetWhmcsOrders,
  GetWhmcsProducts,
} from '../../../@store/Actions/whmcs.action';

@Component({
  selector: 'play-app-whmcs-products-table',
  templateUrl: './whmcs-products-table.component.html',
  styleUrls: ['./whmcs-products-table.component.scss'],
})
export class WhmcsProductsTableComponent implements OnInit {
  products: WhmcsProduct[] = [];
  loading = false;

  //table variables
  displayedColumns: string[] = ['pid', 'name', 'type', 'module'];
  dataSource!: MatTableDataSource<WhmcsProduct>;
  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;
  @ViewChild(MatSort) sort: MatSort | null = null;
  //icons
  faSync = faSync;

  //eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor(private store: Store) {}

  ngOnInit(): void {
    this.fetchProducts();
  }

  /**
   * @summary Fetch data from the store
   */
  fetchProducts() {
    this.loading = true;
    const sub = this.store
      .dispatch(new GetWhmcsProducts({}))
      .subscribe((res) => {
        this.products = res.whmcs.products;
        setTimeout(
          () => (this.dataSource = new MatTableDataSource(this.products))
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
}
