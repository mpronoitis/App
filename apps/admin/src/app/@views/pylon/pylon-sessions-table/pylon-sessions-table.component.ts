import { Component, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngxs/store';
import { PylonSession } from '@play.app/types/Pylon/PylonSession';
import { GetPylonSessions } from '../../../@store/Actions/pylon.action';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { faSync } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'play-app-pylon-sessions-table',
  templateUrl: './pylon-sessions-table.component.html',
  styleUrls: ['./pylon-sessions-table.component.scss'],
})
export class PylonSessionsTableComponent implements OnInit {
  //loading flag
  loading = false;

  // table data
  sessions: PylonSession[] = [];
  displayedColumns: string[] = [
    'Username',
    'Computer',
    'Client',
    'Created',
    'Updated',
  ];
  dataSource!: MatTableDataSource<PylonSession>;
  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;
  @ViewChild(MatSort) sort: MatSort | null = null;

  //icons
  faSync = faSync;

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor(private store: Store) {}

  ngOnInit(): void {
    this.refreshSessions();
  }

  /**
   * @summary Get all sessions from store
   */
  getSessions(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.store.dispatch(new GetPylonSessions()).subscribe({
        next: (result: any) => {
          this.sessions = result.pylon.pylonSessions;
          resolve(true);
        },
        error: (error) => {
          reject(error);
        },
      });
    });
  }

  /**
   * @summary Refresh the sessions table
   */
  refreshSessions(): void {
    this.loading = true;
    this.getSessions().then(
      () => {
        this.loading = false;
        setTimeout(
          () => (this.dataSource = new MatTableDataSource(this.sessions))
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

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
