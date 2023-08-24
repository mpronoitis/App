import { Component, OnDestroy, OnInit } from '@angular/core';
import { faAdd, faSync, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { EdiConnection } from '@play.app/types/Edi/EdiConnection';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngxs/store';
import { ToastrService } from 'ngx-toastr';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import {
  GetEdiConnections,
  GetEdiModels,
  GetEdiOrganizations,
  GetEdiProfiles,
} from '../../../../@store/Actions/edi.actions';
import { BadRequestResponse } from '@play.app/types/Response/BadRequestResponse';
import { GetUsers } from '../../../../@store/Actions/users.action';
import { Router } from '@angular/router';

@Component({
  selector: 'play-app-admin-edi-connection-dashboard',
  templateUrl: './edi-connection-dashboard.component.html',
  styleUrls: ['./edi-connection-dashboard.component.scss'],
})
export class EdiConnectionDashboardComponent implements OnInit, OnDestroy {
  faAdd = faAdd;
  faSync = faSync;
  faTrash = faTrash;
  loading = false;
  showForm = false;
  dataSource!: MatTableDataSource<EdiConnection>; //dataSource of table
  subscription: Subscription | undefined; //to destroy subscription after request

  activeTab = '';
  faArrowLeft = faArrowLeft;

  //Available options for foreign keys
  customerOptions: string[] = [];
  ediprofileOptions: string[] = [];
  modelOptions: string[] = [];
  organiationOptions: string[] = [];
  ediConnectionsOptions: string[] = [];

  //booleans to show and hide forms
  showDeleteConnectionForm = false;
  showAddConnectionForm = false; //when to show addmodel form
  showUpdateConnectionForm = false; //when to show updatemodel form
  ediConnections: EdiConnection[] = [];

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor(
    private store: Store,
    private toastr: ToastrService,
    private router: Router
  ) {
    this.getEdiConnections(1, 1000);
  }

  ngOnInit(): void {
    //Get all edi models
    this.store //get all Edi Models to display theme to autocomplete field
      .dispatch(new GetEdiModels({ page: 1, pageSize: 1000 }))
      .subscribe({
        next: (res) => {
          this.modelOptions = res.edi.ediModels.map(
            //get titile of edi models
            (model: any) => model.title
          );
        },
        error: (err) => {
          console.log(err);
        },
      });

    //get all available edi organizations
    this.store
      .dispatch(new GetEdiOrganizations({ page: 1, pageSize: 1000 }))
      .subscribe({
        next: (response) => {
          this.organiationOptions = response.edi.ediOrganizations.map(
            (organization: any) => organization.name //get names of edi organizations
          );
        },

        error: (error) => {
          console.log(error);
        },
      });

    //get all available users
    this.store.dispatch(new GetUsers({ page: 1, pageSize: 100 })).subscribe({
      next: (response) => {
        this.customerOptions = response.users.users.map(
          (user: any) => user.username //get all users
        );
      },
      error: (error) => {
        console.log(error);
      },
    });

    //get all edi profiles
    this.store
      .dispatch(new GetEdiProfiles({ page: 1, pageSize: 1000 }))
      .subscribe({
        next: (response) => {
          this.ediprofileOptions = response.edi.ediProfiles.map(
            (profile: any) => profile.title //get all profiles
          );
        },
        error: (error) => {
          console.log(error);
        },
      });
  }

  //get all edi connections
  getEdiConnections(page: number, pageSize: number) {
    try {
      this.loading = true;
      this.subscription = this.store
        .dispatch(new GetEdiConnections({ page: page, pageSize: pageSize }))
        .subscribe({
          next: (res) => {
            this.dataSource = new MatTableDataSource<EdiConnection>(
              res.edi.ediConnections
            ); //update table data

            this.ediConnections = res.edi.ediConnections; //update edi connections

            this.ediConnectionsOptions = res.edi.ediConnections.map(
              (connection: any) => connection.ftp_Username
            );
          },
          error: (err) => {
            if (err.status === 400) {
              const badRequestResponse: BadRequestResponse = err.error;
              this.toastr.error();
              this.loading = false;
            } else {
              throw err;
            }
          },
          complete: () => {
            this.loading = false;
            this.toastr.success('Edi Connections fetched successfully');
          },
        });
    } catch (error) {
      console.log(error);
    }
  }

  //Boolean when to show forms to add,edit,delete edi connction
  showAddForm() {
    this.showAddConnectionForm = true;
    this.activeTab = 'create-edi-connection';
    this.showDeleteConnectionForm = false;
    this.showUpdateConnectionForm = false;
  }

  showDeleteForm() {
    this.showDeleteConnectionForm = true;
    this.activeTab = 'delete-edi-connection';
    this.showAddConnectionForm = false;
    this.showUpdateConnectionForm = false;
  }

  showUpdateForm() {
    this.activeTab = 'update-edi-connection';
    this.showUpdateConnectionForm = true;

    this.showDeleteConnectionForm = false;
    this.showAddConnectionForm = false;
  }

  goBack() {
    this.activeTab = '';
    this.showUpdateConnectionForm = false;
    this.showDeleteConnectionForm = false;
    this.showAddConnectionForm = false;
    this.showForm = false;
    this.router.navigate(['/edi/connections']);
  }

  ngOnDestroy(): void {
    //destroy subscription
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
