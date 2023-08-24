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
import { faSync } from '@fortawesome/free-solid-svg-icons';
import { EdiCredit } from '@play.app/types/Edi/EdiCredit';
import { GetPylonContacts } from '../../../../@store/Actions/pylon.action';
import { Store } from '@ngxs/store';
import { GetEdiCredits } from '../../../../@store/Actions/edi.actions';
import { User } from '@play.app/types/User/User';

@Component({
  selector: 'play-app-edi-credit-table',
  templateUrl: './edi-credit-table.component.html',
  styleUrls: ['./edi-credit-table.component.scss'],
})
export class EdiCreditTableComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;
  @ViewChild(MatSort) sort: MatSort | null = null;
  @Input() allCustomers: User[] = []; // Available customers to take customerName base of customerId
  @Output() displayRow = new EventEmitter<EdiCredit>(); //emit when we click on row
  faSync = faSync;
  loading = false;
  dataSource!: MatTableDataSource<EdiCredit>;
  //displayedColumns of table
  displayedColumns: string[] = [
    'customerName',
    'amount',
    'createdAt',
    'updatedAt',
  ];

  ediCredits: EdiCredit[] | undefined;
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor(private store: Store) {}

  ngOnInit(): void {
    this.refreshTable();
  }

  applyFilter(event: Event) {
    //filter of table
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  /**
   *  @summary Function to refresh the table
   */
  refreshTable(): void {
    this.loading = true;
    this.getEdiCredits(1, 1000).then(
      () => {
        this.loading = false;
        setTimeout(
          () => (this.dataSource = new MatTableDataSource(this.ediCredits))
        );
        setTimeout(() => (this.dataSource.paginator = this.paginator));
        setTimeout(() => (this.dataSource.sort = this.sort));
      },
      (error) => {
        this.loading = false;
      }
    );
  }

  /**
   * @summary Get EdiCredits with pagination
   * @param page {number} Page number
   * @param pageSize {number} Page size
   */
  getEdiCredits(page: number, pageSize: number): Promise<any> {
    return new Promise((resolve, reject) => {
      this.store.dispatch(new GetEdiCredits({ page, pageSize })).subscribe({
        next: (result: any) => {
          this.ediCredits = result.edi.ediCredits;
          this.ediCredits = this.initSelect(this.ediCredits ?? []); //call initSelect function to push customerName to ediCredits object
          resolve(true);
        },
        error: (error) => {
          reject(error);
        },
      });
    });
  }

  initSelect(data: EdiCredit[]) {
    //function to push customerName to ediCredits object
    return this.ediCredits?.map((item) => ({
      ...item,
      //take customerName from allUsers
      customerName: this.allCustomers?.find(
        (user) => user.id === item.customerId
      )?.username,
    }));
  }

  displayDetails(row: EdiCredit) {
    //emit when we click on row
    this.displayRow.emit(row);
  }
}
