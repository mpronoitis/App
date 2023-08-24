import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  faArrowLeft,
  faEdit,
  faFileInvoice,
  faPlus,
  faSync,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { User } from '@play.app/types/User/User';
import { Store } from '@ngxs/store';
import { Subscription } from 'rxjs';
import { GetUsers } from '../../../@store/Actions/users.action';
import { faAdd } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { InformationUserDialogComponent } from '../../../@dialogs/User/information-user-dialog/information-user-dialog.component';
import { Router } from '@angular/router';

@Component({
  selector: 'play-app-admin-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.scss'],
})
export class UserDashboardComponent implements OnDestroy, OnInit {
  options: string[] = []; // Email of all Users
  faFileInvoice = faFileInvoice;
  allUsers: User[] = []; //allUsers of database
  faPlus = faPlus;
  faSync = faSync;
  faTrash = faTrash;
  faAdd = faAdd;
  faEdit = faEdit;
  loading = false;
  activeTab = '';
  faArrowLeft = faArrowLeft;
  users!: User[] | undefined;

  subscription: Subscription | undefined;
  email: string | undefined;
  dialogRef: MatDialogRef<InformationUserDialogComponent> | undefined;
  showForm = false;
  showCreateUser = false; // flag show/hide table/user register form
  showUpdateUser = false;
  showDeleteUser = false;
  checkDelete = false;
  showDetailsUser = false; //flag to show profile of current user,when data has been loaded

  constructor(
    private store: Store,
    private toastr: ToastrService,
    private dialog: MatDialog,
    private router: Router
  ) {
    this.getUsers(1, 1000);
  }

  ngOnInit(): void {
    this.email = this.store.selectSnapshot((state) => state.auth.email);
  }

  onYesClick() {
    // if we click yes on delete user
    this.checkDelete = true;
  }

  openInformationDialog(row: User) {
    //open dialog with profile of user
    this.dialogRef = this.dialog.open(InformationUserDialogComponent, {
      width: '600px',
      data: row,
    });
    //take data from dialog
    this.dialogRef.componentInstance.submitClicked.subscribe(() => {
      this.getUsers(1, 1000);
    });
  }

  getUsers(page: number, pageSize: number) {
    //get all users to display them to table
    try {
      this.loading = true; //show loading
      this.store
        .dispatch(new GetUsers({ page: page, pageSize: pageSize }))
        .subscribe({
          next: (response) => {
            this.users = response.users.users;

            this.options = response.users.users.map(
              //available emails
              (user: { email: string }) => user.email
            );
            this.allUsers = response.users.users; //get all Users to find Ids by email
          },
          error: (error) => {
            console.log(error);
          },
          complete: () => {
            this.loading = false; //hide loading,endpoint completed
          },
        });
    } catch (error) {
      console.log(error);
    }
  }

  // Booleans to check when to show right form
  showCreateUserForm() {
    this.activeTab = 'create-user';

    this.showCreateUser = true;
    this.showUpdateUser = false;
    this.showDeleteUser = false;
  }

  showUpdateUserForm() {
    this.activeTab = 'edit-user';
    this.showUpdateUser = true;
    this.showCreateUser = false;
    this.showDeleteUser = false;
  }

  showDeleteUserForm() {
    this.activeTab = 'delete-user';
    this.showDeleteUser = true;
    this.showCreateUser = false;
    this.showUpdateUser = false;
  }

  goBack() {
    this.activeTab = '';
    this.showDeleteUser = false;
    this.showCreateUser = false;
    this.showUpdateUser = false;
    this.showForm = false; //update User Form
    this.router.navigate(['/users']);
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
