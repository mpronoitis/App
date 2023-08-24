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
import { PylonInvoice } from '@play.app/types/Pylon/PylonInvoice';
import { faSync } from '@fortawesome/free-solid-svg-icons';
import { faEuroSign } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'play-app-invoice-table',
  templateUrl: './invoice-table.component.html',
  styleUrls: ['./invoice-table.component.scss'],
})
export class InvoiceTableComponent implements OnInit {
  @Input()
  invoices!: PylonInvoice[] | undefined; //invoices passed in from parent component
  @Output() displayRow = new EventEmitter<PylonInvoice>(); //emit when we click at row
  @Output() refresh = new EventEmitter<void>(); //emit when we press refresh button

  //icons
  faSync = faSync;
  faEuroSign = faEuroSign;

  //table data
  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;
  @ViewChild(MatSort) sort: MatSort | null = null;
  dataSource!: MatTableDataSource<PylonInvoice>;
  displayedColumns: string[] = [
    'invoiceCode',
    'totalAmountWithTax',
    'invoiceDate',
    'totalVat',
  ];

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}

  ngOnInit(): void {
    setTimeout(
      () =>
        (this.dataSource = new MatTableDataSource<PylonInvoice>(this.invoices))
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

  displayInvoice(invoice: PylonInvoice) {
    this.displayRow.emit(invoice);
  }

  refreshData() {
    this.refresh.emit();
  }
}
