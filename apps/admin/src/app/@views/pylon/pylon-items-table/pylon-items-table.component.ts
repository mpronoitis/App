import { Component, OnInit, ViewChild } from '@angular/core';
import { PylonItem } from '@play.app/types/Pylon/PylonItem';
import { Store } from '@ngxs/store';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { faSync, faDownload } from '@fortawesome/free-solid-svg-icons';
import {
  GetPylonItemByName,
  GetPylonItems,
  GetPylonItemsCount,
} from '../../../@store/Actions/pylon.action';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'play-app-pylon-items-table',
  templateUrl: './pylon-items-table.component.html',
  styleUrls: ['./pylon-items-table.component.scss'],
})
export class PylonItemsTableComponent implements OnInit {
  loading = false;
  items: PylonItem[] = [];
  totalItems = 0;

  //table data
  displayedColumns: string[] = ['Code', 'Name', 'factoryCode', 'Created'];
  dataSource!: MatTableDataSource<PylonItem>;
  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;
  @ViewChild(MatSort) sort: MatSort | null = null;

  //icons
  faSync = faSync;
  faDownload = faDownload;

  //eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor(private store: Store, private toastr: ToastrService) {}

  ngOnInit(): void {
    this.getItems(1, 1000);
    this.getTotalItems();
  }

  /**
   * @summary Function to get items from store
   * @param page page number
   * @param pageSize page size
   * @param refresh optional refresh flag
   * @returns void
   */
  getItems(page: number, pageSize: number, refresh?: boolean): void {
    this.loading = true;
    if (refresh) {
      this.items = [];
    }
    if (pageSize > 1000) {
      this.toastr.info("I hope you've got enough RAM for this...");
    }
    this.store
      .dispatch(new GetPylonItems({ page: page, pageSize: pageSize }))
      .subscribe({
        next: (result: any) => {
          //add items to list
          this.items.push(...result.pylon.pylonItems);
          setTimeout(
            () => (this.dataSource = new MatTableDataSource(this.items))
          );
          setTimeout(() => (this.dataSource.paginator = this.paginator));
          setTimeout(() => (this.dataSource.sort = this.sort));
          this.loading = false;
          this.toastr.success('Fetched ' + pageSize + ' items ');
        },
        error: (error) => {
          this.loading = false;
          console.log(error);
        },
      });
  }

  /**
   * @summary Function to get total items
   */
  getTotalItems(): void {
    this.store.dispatch(new GetPylonItemsCount()).subscribe({
      next: (result: any) => {
        this.totalItems = result.pylon.pylonItemsCount;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  /**
   * @summary Find item by name
   * @param name name of item
   */
  findItemByName(name: string) {
    this.loading = true;
    this.store.dispatch(new GetPylonItemByName({ name: name })).subscribe({
      next: (result: any) => {
        this.items.push(...result.pylon.pylonItems);
        setTimeout(
          () => (this.dataSource = new MatTableDataSource(this.items))
        );
        setTimeout(() => (this.dataSource.paginator = this.paginator));
        setTimeout(() => (this.dataSource.sort = this.sort));
        this.loading = false;
      },
      error: (error) => {
        this.loading = false;
        console.log(error);
      },
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    //if nothing , find by name
    if (this.dataSource.filteredData.length === 0) {
      this.findItemByName(filterValue);
    }

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
