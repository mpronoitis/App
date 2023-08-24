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
import { EdiOrganization } from '@play.app/types/Edi/EdiOrganization';
import { faSync } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'play-app-admin-edi-organization-table',
  templateUrl: './edi-organization-table.component.html',
  styleUrls: ['./edi-organization-table.component.scss'],
})
export class EdiOrganizationTableComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;
  @ViewChild(MatSort) sort: MatSort | null = null;
  @Input() organizations!: EdiOrganization[] | undefined;
  @Output() refresh = new EventEmitter<void>(); //emit when we press refresh button
  dataSource!: MatTableDataSource<EdiOrganization>;
  displayedColumns: string[] = ['id', 'email', 'name']; //columns of table
  faSync = faSync;
  loading = false;
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}
  ngOnInit(): void {
    setTimeout(
      () =>
        (this.dataSource = new MatTableDataSource<EdiOrganization>(
          this.organizations
        ))
    );
    setTimeout(() => (this.dataSource.paginator = this.paginator));
    setTimeout(() => (this.dataSource.sort = this.sort));
  }

  applyFilter(event: Event) {
    //filter to search mat-table
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  refreshData() {
    this.refresh.emit();
  }
}
