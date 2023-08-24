import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import {
  faBuilding,
  faFile,
  faHome,
  faNetworkWired,
  faSitemap,
  faCreditCard,
} from '@fortawesome/free-solid-svg-icons';
import { faCloudUpload } from '@fortawesome/free-solid-svg-icons';
import { Store } from '@ngxs/store';
import { EdiDocument } from '@play.app/types/Edi/EdiDocument';
import { ToastrService } from 'ngx-toastr';
import {
  GetEdiDocumentCountReport,
  GetEdiDocuments,
} from '../../../@store/Actions/edi.actions';
import { faSync } from '@fortawesome/free-solid-svg-icons';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { SendEdiDialogComponent } from '../../../@dialogs/Edi/send-edi-dialog/send-edi-dialog.component';
import { GetUsers } from '../../../@store/Actions/users.action';
import { User } from '@play.app/types/User/User';

@Component({
  selector: 'play-app-admin-edi-dashboard',
  templateUrl: './edi-dashboard.component.html',
  styleUrls: ['./edi-dashboard.component.scss'],
})
export class EdiDashboardComponent implements OnDestroy, OnInit {
  //Icons FontAwesome
  faHome = faHome;
  faFile = faFile;
  faSiteMap = faSitemap;
  faNetworkWired = faNetworkWired;
  faBuilding = faBuilding;
  faCloudUpload = faCloudUpload;
  faSync = faSync;
  faCreditCard = faCreditCard;

  unSentDocuments = 0;
  data: any[] = []; //data for the charts
  ediDocuments: EdiDocument[] = [];
  ediDocumentReport: any;
  loading = false;
  dialog_subscription: Subscription | undefined;
  subscription: Subscription | undefined;
  //available customers to use when creating a new credit
  customerOptions: string[] = [];
  //all Users
  allUsers: User[] | undefined;

  //table variables
  displayedColumns: string[] = ['customerName', 'title', 'isSent'];
  dataSource!: MatTableDataSource<EdiDocument>;
  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;
  @ViewChild(MatSort) sort: MatSort | null = null;
  allCustomers: User[] = [];

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor(
    private store: Store,
    private tooastr: ToastrService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    const promises = [
      this.getUsers(),
      this.getDocumentCount(),
      this.getEdiDocuments(1, 1),
    ];

    //resolve all promises and after that set the loading flag to false
    this.loading = true;
    Promise.all(promises).then(
      () => {
        this.loading = false;
      },
      (error) => {
        this.loading = false;
      }
    );
  }

  //function to get all Users to pass them to table component
  getUsers() {
    return new Promise((resolve, reject) => {
      //get all available users
      this.subscription = this.store
        .dispatch(new GetUsers({ page: 1, pageSize: 1000 }))
        .subscribe({
          next: (response) => {
            this.allUsers = response.users.users;
            this.customerOptions = response.users.users.map(
              (user: any) => user.username //get all users
            );
            console.log('Get Users');
            resolve(true);
          },
          error: (error) => {
            console.log(error);
            reject(false);
          },
        });
    });
  }

  getEdiDocuments(page: number, pageSize: number): Promise<boolean> {
    //get last documents
    return new Promise((resolve, reject) => {
      this.store.dispatch(new GetEdiDocuments({ page, pageSize })).subscribe({
        next: (result) => {
          this.ediDocuments = result.edi.ediDocuments;
          this.ediDocuments = this.initSelect(this.ediDocuments ?? []);
          console.log(this.ediDocuments);

          this.dataSource = new MatTableDataSource<EdiDocument>(
            this.ediDocuments
          );
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          this.unSentDocuments = this.ediDocuments.filter(
            (x) => !x.isSent
          ).length;
          console.log('Get EdiDocuments');
          resolve(true);
        },

        error: (error) => {
          console.log(error);
          reject(false);
        },
        complete: () => {
          this.tooastr.success('Edi Documents Loaded');
        },
      });
    });
  }

  initSelect(data: EdiDocument[]) {
    //function to push customerName to ediCredits object
    return this.ediDocuments?.map((item) => ({
      ...item,
      //take customerName from allUsers
      customerName: this.allUsers?.find((user) => user.id === item.customer_Id)
        ?.username,
    }));
  }

  applyFilter(event: Event) {
    //filter of table
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openSendDialog(
    enterAnimationDuration: string,
    exitAnimationDuration: string
  ): void {
    this.dialog_subscription = this.dialog
      .open(SendEdiDialogComponent, {
        width: '400px',
        data: this.unSentDocuments,
        enterAnimationDuration,
        exitAnimationDuration,
      })
      .afterClosed()
      .subscribe({
        next: (result) => {
          if (result === true) {
            this.getEdiDocuments(1, 1);
          }
        },
        error: (err) => {
          this.tooastr.error();
          console.log(err);
        },
      });
  }

  getDocumentCount(): Promise<boolean> {
    //function to take daily count of documents
    return new Promise((resolve, reject) => {
      //get auth.id from store

      this.store
        .dispatch(
          new GetEdiDocumentCountReport({
            startDate: '2022-11-01',
            endDate: '2022-11-30',
            period: 'daily',
          })
        )
        .subscribe({
          next: (result) => {
            this.ediDocumentReport = result.edi.ediDocumentCountReport;

            resolve(true);
          },

          error: (error) => {
            if (error.status === 400) {
              this.tooastr.error("Can't get document count");
              reject(false);
            } else {
              reject(false);
              throw error;
            }
          },
          complete: () => {
            const chart_data: any[] = [
              { name: 'Documents', series: [{ name: '', value: 0 }] }, //data of line_chart
            ]; //chart_data
            this.ediDocumentReport.forEach(
              //loopping through the data
              (element: { date: string; count: number }) =>
                chart_data[0].series.push({
                  name: element.date,
                  value: element.count,
                })
            );

            chart_data[0].series.shift(); //remove first element
            chart_data[0].series.reverse(); //order by date
            this.data = chart_data; //initialize data of chart
          },
        });
    });
  }

  //make sure we don't leave any subscriptions open
  ngOnDestroy(): void {
    if (this.dialog_subscription) {
      this.dialog_subscription.unsubscribe();
    }
  }
}
