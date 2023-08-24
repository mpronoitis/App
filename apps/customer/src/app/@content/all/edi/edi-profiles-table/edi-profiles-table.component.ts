import { Component, OnDestroy, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngxs/store';
import { Subscription } from 'rxjs';
import { EdiProfile } from '@play.app/types/Edi/EdiProfile';
import { faPlus, faSync } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { GetEdiProfiles } from 'apps/customer/src/app/@store/Actions/edi.actions';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'play-app-edi-profiles-table',
  templateUrl: './edi-profiles-table.component.html',
  styleUrls: ['./edi-profiles-table.component.scss'],
})
export class EdiProfilesTableComponent implements OnDestroy {
  loading = false;
  message_text = '';
  subscription: Subscription | undefined;
  id = localStorage.getItem('auth.id')?.replace(/['"]+/g, '');

  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;
  @ViewChild(MatSort) sort: MatSort | null = null;
  displayedColumns: string[] = ['title', 'enabled'];
  dataSource!: MatTableDataSource<EdiProfile>;

  faSync = faSync;
  faPlus = faPlus;

  constructor(
    public store: Store,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.getProfiles(1, 100);
  }

  profileEditor(row: EdiProfile) {
    this.router.navigate(['edi/profile-editor', row.id]).then();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  /**
   * @summary Function to fetch profiles via the store
   */
  getProfiles(page: number, pageSize: number) {
    try {
      this.loading = true;
      this.subscription = this.store
        .dispatch(
          new GetEdiProfiles({
            customer_Id: this.id ?? '',
            page,
            pageSize,
          })
        )
        .subscribe({
          next: (result) => {
            this.loading = false;
            this.dataSource = new MatTableDataSource(result.edi.ediProfiles);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
          },
          error: () => {
            this.toastr.error('Error while getting profiles');
          },
          complete: () => {
            this.loading = false;
          },
        });
    } catch {
      this.loading = false;
      this.toastr.error();
    }
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
