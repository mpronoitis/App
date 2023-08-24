import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { TwentyStackUser } from '@play.app/types/20i/TwentyStackUser';
import { MatTableDataSource } from '@angular/material/table';
import { faSync } from '@fortawesome/free-solid-svg-icons';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'play-app-twentyi-users-table',
  templateUrl: './twentyi-users-table.component.html',
  styleUrls: ['./twentyi-users-table.component.scss'],
})
export class TwentyiUsersTableComponent implements OnInit {
  @Input() users!: TwentyStackUser[];
  @Output() refreshUsers = new EventEmitter<void>(); //emit when we press refresh button

  //table variables
  displayedColumns: string[] = [
    'avatarUrl',
    'firstName',
    'lastName',
    'email',
    'company_name',
    'createdAt',
  ];
  dataSource!: MatTableDataSource<TwentyStackUser>;
  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;
  @ViewChild(MatSort) sort: MatSort | null = null;

  //icons
  faSync = faSync;

  //eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}

  ngOnInit(): void {
    setTimeout(() => (this.dataSource = new MatTableDataSource(this.users)));
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

  refresh() {
    this.refreshUsers.emit();
  }
}
