import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { User } from '@play.app/types/User/User';
import { faSync } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'play-app-admin-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.scss'],
})
export class UserTableComponent implements OnInit {
  displayedColumns: string[] = [
    'avatar',
    'email',
    'role',
    'loginAttempts',
    'failedLoginAttempts',
    'lastLogin',
    'createdAt',
  ];
  faSync = faSync;
  @Input() users!: User[] | undefined;
  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;
  @ViewChild(MatSort) sort: MatSort | null = null;
  @Output() refresh = new EventEmitter<void>(); //emit when we press refresh button
  @Output() displayRow = new EventEmitter<User>(); //emit when we click at row
  dataSource!: MatTableDataSource<User>;

  //eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}

  ngOnInit(): void {
    setTimeout(
      () => (this.dataSource = new MatTableDataSource<User>(this.users))
    );
    setTimeout(() => (this.dataSource.paginator = this.paginator));
    setTimeout(() => (this.dataSource.sort = this.sort));
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  refreshData() {
    this.refresh.emit();
  }

  displayUser(row: User) {
    this.displayRow.emit(row);
  }
}
