import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngxs/store';
import {
  GetPylonContacts,
  SearchPylonContacts,
} from '../../../@store/Actions/pylon.action';
import { PylonContact } from '@play.app/types/Pylon/PylonContact';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { faSync } from '@fortawesome/free-solid-svg-icons';
import { APP_ENV } from '@play.app/app-env';
import { Observable } from 'rxjs/internal/Observable';
import { HttpClient } from '@angular/common/http';
import { timeout } from 'rxjs';

@Component({
  selector: 'play-app-pylon-contacts-table',
  templateUrl: './pylon-contacts-table.component.html',
  styleUrls: ['./pylon-contacts-table.component.scss'],
})
export class PylonContactsTableComponent implements OnInit {
  loading = false;

  //table data
  contacts: PylonContact[] = [];
  displayedColumns: string[] = [
    'name',
    'tin',
    'phoneNumbers',
    'emailAddresses',
    'address',
  ];
  dataSource!: MatTableDataSource<PylonContact>;
  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;
  @ViewChild(MatSort) sort: MatSort | null = null;

  //icons
  faSync = faSync;

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor(
    private store: Store,
    @Inject(APP_ENV) private environment: any,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.refreshTable();
  }

  /**
   * @summary Get contacts with pagination
   * @param page {number} Page number
   * @param pageSize {number} Page size
   */
  getContacts(page: number, pageSize: number): Promise<any> {
    return new Promise((resolve, reject) => {
      this.store.dispatch(new GetPylonContacts({ page, pageSize })).subscribe({
        next: (result: any) => {
          this.contacts = result.pylon.pylonContacts;
          resolve(true);
        },
        error: (error) => {
          reject(error);
        },
      });
    });
  }

  ExportLdif(): Promise<any> {
    this.loading = true;
    const request: Observable<any> = this.http.get(
      this.environment.API_URL + 'pylon/ldap/ldif',
      { responseType: 'blob' }
    );
    return new Promise((resolve, reject) => {
      request.pipe(timeout(this.environment.API_TIMEOUT)).subscribe({
        next: (data: any) => {
          //download file
          const blob = new Blob([data], { type: 'text/plain' });
          const url = window.URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.download = 'contacts.ldif';
          link.click();
          window.URL.revokeObjectURL(url);
          resolve(data);
          this.loading = false;
        },
        error: (err) => {
          reject(err);
          this.loading = false;
        },
      });
    });
  }

  /**
   * @summary SearchPylonContacts
   * @param value {string} Search value
   */
  searchContacts(value: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.store
        .dispatch(
          new SearchPylonContacts({
            phone: true,
            email: true,
            name: true,
            address: true,
            query: value,
          })
        )
        .subscribe({
          next: (result: any) => {
            this.contacts = result.pylon.pylonContacts;
            resolve(true);
          },
          error: (error) => {
            reject(error);
          },
        });
    });
  }

  /**
   *  @summary Function to refresh the table
   */
  refreshTable(): void {
    this.loading = true;
    this.getContacts(1, 1000).then(
      () => {
        this.loading = false;
        setTimeout(
          () => (this.dataSource = new MatTableDataSource(this.contacts))
        );
        setTimeout(() => (this.dataSource.paginator = this.paginator));
        setTimeout(() => (this.dataSource.sort = this.sort));
      },
      (error) => {
        this.loading = false;
      }
    );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    //if 0 found then search by name
    if (this.dataSource.filteredData.length === 0) {
      this.loading = true;
      this.searchContacts(filterValue.trim().toLowerCase()).then(
        () => {
          setTimeout(
            () => (this.dataSource = new MatTableDataSource(this.contacts))
          );
          setTimeout(() => (this.dataSource.paginator = this.paginator));
          setTimeout(() => (this.dataSource.sort = this.sort));
          this.loading = false;
        },
        (error) => {
          this.loading = false;
        }
      );
    }

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
