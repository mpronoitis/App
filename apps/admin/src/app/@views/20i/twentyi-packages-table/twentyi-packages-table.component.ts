import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { TwentyPackage } from '@play.app/types/20i/TwentyPackage';
import { MatTableDataSource } from '@angular/material/table';
import { TwentyDomain } from '@play.app/types/20i/TwentyDomain';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { faSync } from '@fortawesome/free-solid-svg-icons';
import { MatDialog } from '@angular/material/dialog';
import { TwentyPackageDetailsDialogComponent } from '../../../@dialogs/20i/twenty-package-details-dialog/twenty-package-details-dialog.component';
import { SelectionModel } from '@angular/cdk/collections';
import { faVirus } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'play-app-twentyi-packages-table',
  templateUrl: './twentyi-packages-table.component.html',
  styleUrls: ['./twentyi-packages-table.component.scss'],
})
export class TwentyiPackagesTableComponent implements OnInit {
  @Input() packages!: TwentyPackage[];
  @Output() refreshPackages = new EventEmitter<void>(); //emit when we press refresh button
  @Output() startMassScan = new EventEmitter<string[]>(); //emit when to start a mass scan
  //table variables
  displayedColumns: string[] = [
    'select',
    'platform',
    'name',
    'serviceType',
    'created',
    'enabled',
  ];
  faVirus = faVirus;
  dataSource!: MatTableDataSource<TwentyPackage>;
  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;
  @ViewChild(MatSort) sort: MatSort | null = null;
  selection = new SelectionModel<TwentyPackage>(true, []);

  //icons
  faSync = faSync;

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {
    setTimeout(() => (this.dataSource = new MatTableDataSource(this.packages)));
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

  /**
   * @description Open TwentyPackageDetailsDialogComponent dialog , pass package id as input
   * @param packageId package id
   */
  openPackageDetailsDialog(packageId: string) {
    this.dialog.open(TwentyPackageDetailsDialogComponent, {
      data: packageId,
    });
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.packages.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }
    this.selection.select(...this.packages);
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: TwentyPackage): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${
      this.selection.isSelected(row) ? 'deselect' : 'select'
    } row ${this.findPositionInArray(row)}`;
  }

  //findPositionInArray
  findPositionInArray(row: TwentyPackage) {
    return this.packages.findIndex((item) => item.id === row.id) + 1;
  }

  getPackages() {
    this.refreshPackages.emit();
  }

  massScan(selectedPackages: TwentyPackage[]) {
    //get all id of selected packages
    const selectedPackagesId = selectedPackages.map((item) =>
      item.id.toString()
    );
    this.startMassScan.emit(selectedPackagesId);
  }
}
