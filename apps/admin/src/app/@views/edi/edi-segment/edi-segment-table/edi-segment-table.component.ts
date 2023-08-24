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
import { EdiSegment } from '@play.app/types/Edi/EdiSegment';
import { faSync } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'play-app-admin-edi-segment-table',
  templateUrl: './edi-segment-table.component.html',
  styleUrls: ['./edi-segment-table.component.scss'],
})
export class EdiSegmentTableComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;
  @ViewChild(MatSort) sort: MatSort | null = null;
  @Input() ediSegments!: EdiSegment[] | undefined;
  displayedColumns: string[] = ['id', 'model_Id', 'title', 'description']; //columns of table
  dataSource!: MatTableDataSource<EdiSegment>;
  loading = false;
  faSync = faSync;
  @Output() refresh = new EventEmitter<void>(); //emit when we press refresh button
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}

  applyFilter(event: Event) {
    //filter to search mat-table
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  ngOnInit(): void {
    setTimeout(
      () =>
        (this.dataSource = new MatTableDataSource<EdiSegment>(this.ediSegments))
    );
    setTimeout(() => (this.dataSource.paginator = this.paginator));
    setTimeout(() => (this.dataSource.sort = this.sort));
  }

  refreshData() {
    this.refresh.emit();
  }
}
