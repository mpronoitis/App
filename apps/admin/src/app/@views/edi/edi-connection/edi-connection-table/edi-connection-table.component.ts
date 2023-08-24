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
import { EdiConnection } from '@play.app/types/Edi/EdiConnection';
import { faSync } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'play-app-admin-edi-connection-table',
  templateUrl: './edi-connection-table.component.html',
  styleUrls: ['./edi-connection-table.component.scss'],
})
export class EdiConnectionTableComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;
  @ViewChild(MatSort) sort: MatSort | null = null;
  @Output() refresh = new EventEmitter<void>(); //emit when we press refresh button
  faSync = faSync;
  loading = false;
  dataSource!: MatTableDataSource<EdiConnection>;
  displayedColumns: string[] = [
    'id',
    'customer_Id',
    'model_Id',
    'org_Id',
    'profile_Id',
    'ftp_Hostname',
    'ftp_Username',
    'ftp_Password',
    'ftp_Port',
    'file_Type',
  ];
  @Input() ediConnections!: EdiConnection[] | undefined;
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}
  ngOnInit(): void {
    setTimeout(
      () =>
        (this.dataSource = new MatTableDataSource<EdiConnection>(
          this.ediConnections
        ))
    );
    setTimeout(() => (this.dataSource.paginator = this.paginator));
    setTimeout(() => (this.dataSource.sort = this.sort));
  }

  applyFilter(event: Event) {
    //filter of table
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
