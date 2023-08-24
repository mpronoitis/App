import { Component, OnDestroy, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { faSync } from '@fortawesome/free-solid-svg-icons';
import { Store } from '@ngxs/store';
import { Subscription } from 'rxjs';
import { EdiConnection } from '@play.app/types/Edi/EdiConnection';
import { GetEdiConnections } from 'apps/customer/src/app/@store/Actions/edi.actions';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'play-app-edi-connections-table',
  templateUrl: './edi-connections-table.component.html',
  styleUrls: ['./edi-connections-table.component.scss'],
})
export class EdiConnectionsTableComponent implements OnDestroy {
  displayedColumns: string[] = ['ftp_Hostname', 'ftp_Username'];
  dataSource!: MatTableDataSource<EdiConnection>;
  loading = false;
  show_message = false;
  message_text = '';
  subscription: Subscription | undefined;
  id = localStorage.getItem('auth.id')?.replace(/['"]+/g, '');
  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;
  @ViewChild(MatSort) sort: MatSort | null = null;
  faSync = faSync;

  constructor(private store: Store, private toastr: ToastrService) {
    this.getConnections(1, 100);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  /**
   * @summary Function to fetch connections via the store
   */
  getConnections(page: number, pageSize: number) {
    try {
      this.loading = true;
      this.subscription = this.store
        .dispatch(
          new GetEdiConnections({
            customer_Id: this.id ?? '',
            page,
            pageSize,
          })
        )
        .subscribe({
          next: (result) => {
            this.loading = false;
            this.dataSource = new MatTableDataSource(result.edi.ediConnections);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
          },
          error: () => {
            this.toastr.error('Error while getting connections');
          },
          complete: () => {
            this.loading = false;
          },
        });
    } catch (err) {
      this.toastr.error();
    }
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
