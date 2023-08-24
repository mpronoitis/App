import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  faArrowLeft,
  faEdit,
  faFileInvoice,
  faPlus,
  faSync,
  faTrash,
  faAdd,
} from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { ToastrService } from 'ngx-toastr';
import { EdiCredit } from '@play.app/types/Edi/EdiCredit';
import {
  GetEdiConnections,
  GetEdiCredits,
} from '../../../../@store/Actions/edi.actions';
import { Subscription } from 'rxjs';
import { BadRequestResponse } from '@play.app/types/Response/BadRequestResponse';
import { MatTableDataSource } from '@angular/material/table';
import { EdiConnection } from '@play.app/types/Edi/EdiConnection';
import { GetUsers } from '../../../../@store/Actions/users.action';
import { MatDialog } from '@angular/material/dialog';
import { EdiCreditDetailsDialogComponent } from '../../../../@dialogs/Edi/edi-credit-details-dialog/edi-credit-details-dialog.component';
import { User } from '@play.app/types/User/User';
@Component({
  selector: 'play-app-edi-credit-dashboard',
  templateUrl: './edi-credit-dashboard.component.html',
  styleUrls: ['./edi-credit-dashboard.component.scss'],
})
export class EdiCreditDashboardComponent implements OnInit, OnDestroy {
  //icons
  faFileInvoice = faFileInvoice;
  faArrowLeft = faArrowLeft;
  faPlus = faPlus;
  faSync = faSync;
  faTrash = faTrash;
  faEdit = faEdit;
  faAdd = faAdd;
  //boolean flags
  showAddCredit = false;
  showUpdateCredit = false;
  showDeleteCredit = false;
  loading = false;

  activeTab = '';
  subscription: Subscription | undefined;

  //available customers to use when creating a new credit
  customerOptions: string[] = [];
  //all Users
  allUsers: User[] | undefined;
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor(
    private router: Router,
    private store: Store,
    private toastr: ToastrService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    // before initializing the component get all users
    this.getAllUsers();
  }

  getAllUsers() {
    //get all users
    this.loading = true; //set loading to true, when get all users is done set it to false and show child componenetes
    this.getUsers().then(
      () => {
        this.loading = false; //set loading to false when promise is resolved
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
            resolve(true);
          },
          error: (error) => {
            console.log(error);
            reject(false);
          },
        });
    });
  }

  // Booleans to check when to show right form
  showAddCreditForm() {
    this.activeTab = 'create-credit';
    this.showAddCredit = true;
    this.showUpdateCredit = false;
    this.showDeleteCredit = false;
  }

  showUpdateCreditForm() {
    this.activeTab = 'edit-credit';
    this.showUpdateCredit = true;
    this.showAddCredit = false;
    this.showDeleteCredit = false;
  }

  showDeleteCreditForm() {
    this.activeTab = 'delete-credit';
    this.showDeleteCredit = true;
    this.showAddCredit = false;
    this.showUpdateCredit = false;
  }

  goBack() {
    this.activeTab = '';
    this.showDeleteCredit = false;
    this.showAddCredit = false;
    this.showUpdateCredit = false;
    this.router.navigate(['edi/credit']);
  }

  displayEdiCredit(ediCredit: EdiCredit) {
    this.dialog.open(EdiCreditDetailsDialogComponent, {
      data: ediCredit,
      width: '70%',
    });
  }

  ngOnDestroy(): void {
    //unsubscribe from all subscriptions
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
