import { Component, Input, OnInit, Output, ViewChild } from '@angular/core';
import { TwentyDomain } from '@play.app/types/20i/TwentyDomain';
import { MatTableDataSource } from '@angular/material/table';
import { faSync, faSearch } from '@fortawesome/free-solid-svg-icons';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TwentyDomainSearchDialogComponent } from '../../../@dialogs/20i/twenty-domain-search-dialog/twenty-domain-search-dialog.component';

@Component({
  selector: 'play-app-twentyi-domains-table',
  templateUrl: './twentyi-domains-table.component.html',
  styleUrls: ['./twentyi-domains-table.component.scss'],
})
export class TwentyiDomainsTableComponent implements OnInit {
  @Input() domains!: TwentyDomain[];
  @Output() refreshDomains = new EventEmitter<void>(); //emit when we press refresh button

  //table variables
  displayedColumns: string[] = ['name', 'expiryDate', 'deadDate'];
  dataSource!: MatTableDataSource<TwentyDomain>;
  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;
  @ViewChild(MatSort) sort: MatSort | null = null;

  //icons
  faSync = faSync;
  faSearch = faSearch;

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {
    setTimeout(() => (this.dataSource = new MatTableDataSource(this.domains)));
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

  getAllDomains() {
    this.refreshDomains.emit();
  }

  openSearchDialog(): void {
    this.dialog.open(TwentyDomainSearchDialogComponent);
  }
}
