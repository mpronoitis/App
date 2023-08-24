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
import { EdiModel } from '@play.app/types/Edi/EdiModel';
import { faSync } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'play-app-admin-edi-model-table',
  templateUrl: './edi-model-table.component.html',
  styleUrls: ['./edi-model-table.component.scss'],
})
export class EdiModelTableComponent implements OnInit {
  //Displayed Columns of Edi Model
  displayedColumns: string[] = ['enabled', 'id', 'org_Id', 'title'];
  faSync = faSync;
  loading = false;
  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;
  @ViewChild(MatSort) sort: MatSort | null = null;
  @Input() models!: EdiModel[] | undefined;
  dataSource!: MatTableDataSource<EdiModel>;
  @Output() refresh = new EventEmitter<void>(); //emit when we press refresh button
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}

  ngOnInit(): void {
    setTimeout(
      () => (this.dataSource = new MatTableDataSource<EdiModel>(this.models))
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
