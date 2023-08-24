import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { TwentyResellerPackageTypes } from '@play.app/types/20i/TwentyResellerPackageTypes';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { faSync } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'play-app-twentyi-package-types-table',
  templateUrl: './twentyi-package-types-table.component.html',
  styleUrls: ['./twentyi-package-types-table.component.scss'],
})
export class TwentyiPackageTypesTableComponent implements OnInit {
  @Input() packageTypes!: TwentyResellerPackageTypes[];

  //table variables
  displayedColumns: string[] = ['platform', 'label'];
  dataSource!: MatTableDataSource<TwentyResellerPackageTypes>;
  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;
  @ViewChild(MatSort) sort: MatSort | null = null;

  //icons
  faSync = faSync;

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}

  ngOnInit(): void {
    setTimeout(
      () => (this.dataSource = new MatTableDataSource(this.packageTypes))
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
}
