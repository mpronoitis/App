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
import { EdiVariable } from '@play.app/types/Edi/EdiVariable';
import { faSync } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'play-app-admin-edi-variable-table',
  templateUrl: './edi-variable-table.component.html',
  styleUrls: ['./edi-variable-table.component.scss'],
})
export class EdiVariableTableComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;
  @ViewChild(MatSort) sort: MatSort | null = null;
  displayedColumns: string[] = ['id', 'title', 'description', 'placeholder']; //columns of table
  @Input() variables!: EdiVariable[] | undefined;
  faSync = faSync;
  loading = false;
  dataSource!: MatTableDataSource<EdiVariable>;
  @Output() refresh = new EventEmitter<void>(); //emit when we press refresh button
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}

  ngOnInit(): void {
    setTimeout(
      () =>
        (this.dataSource = new MatTableDataSource<EdiVariable>(this.variables))
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
